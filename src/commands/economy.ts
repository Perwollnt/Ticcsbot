/*import { ChatUserstate, Client } from 'tmi.js';
import { BotCommand, CommandConfig, CommandRequire } from '../utils/interfaces';
import * as set from '../config';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';


export class EconomyCommand implements BotCommand {
    config: CommandConfig = {
        name: "aeconomy",
        aliases: ["ae"],
        cooldown: 1,
        enabled: true,
        description: "Economy command(s)",
    }
    require: CommandRequire = {
        developer: false,
        mod: true,
        sub: false,
        follower: false,
        user: false,

    };
    onTriggered = async (client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) => {
        if(!args[0]) return client.say(channel, set.messages.economy.helpmessage.replaceAll("%u", state.username));
        switch (args[0]) {
            case "work":
                this.work(state, client, channel, args);
                break;
            case "buy":
                this.shop(state, client, channel, args);    
                break;
            case "shop":
                this.shop(state, client, channel, args);    
                break;
            case "gamble":
                this.gamble(state, client, channel, args);
                break;
            case "balance":
                const db = admin.firestore();
                const ref = db.collection("TiccsBot").doc("Economy").collection("Users").doc(state['user-id']);
                const doc = (await ref.get()) as firestore.DocumentSnapshot<any>;
                if(!doc.exists) {
                    client.say(channel, set.messages.economy.balancemessage.replaceAll("%u", state.username).replaceAll("%m", "0"));
                }
                else {
                    client.say(channel, set.messages.economy.balancemessage.replaceAll("%u", state.username).replaceAll("%m", doc.data().money.toString()));
                }
                break;
            default:
                break;
        }



    }
    async shop(state: ChatUserstate, client: Client, channel: string, args: Array<String>) {
        if(!args[1]) return client.say(channel, set.messages.economy.shop.needarg.replaceAll("%u", state.username));
        const item = args[1];
        const balance = await this.getBalance(state);
        console.log(`bal: ${balance}, item: ${item}`);
        switch (item) {
            case "pickaxe":
                if(balance > set.messages.economy.shop.pickaxe.cost) {
                    const db = admin.firestore();
                    let ref = db.collection("TiccsBot").doc("Economy").collection("Users").doc(state['user-id']);
                    let doc = (await ref.get()) as firestore.DocumentSnapshot<any>;
                    ref.set({
                        money: (doc.data().money - set.messages.economy.shop.pickaxe.cost),
                        pickaxe: true,
                    }, {merge: true});
                    client.say(channel, set.messages.economy.shop.bought.replaceAll("%u", state.username).replaceAll("%m", (set.messages.economy.shop.pickaxe.cost).toString()).replaceAll("%i", `${item}`));
                } else {
                    client.say(channel, set.messages.economy.shop.no_money.replaceAll("%u", state.username).replaceAll("%m", set.messages.economy.shop.pickaxe.cost.toString()).replaceAll("%i", `${item}`));
                }
                break;
            case "flashlight":
                if(balance > set.messages.economy.shop.flashlight.cost) {
                    const db = admin.firestore();
                    let ref = db.collection("TiccsBot").doc("Economy").collection("Users").doc(state['user-id']);
                    let doc = (await ref.get()) as firestore.DocumentSnapshot<any>;
                    ref.set({
                        money: (doc.data().money - set.messages.economy.shop.flashlight.cost),
                        flashlight: true,
                    }, {merge: true});
                    client.say(channel, set.messages.economy.shop.bought.replaceAll("%u", state.username).replaceAll("%m", (set.messages.economy.shop.flashlight.cost).toString()).replaceAll("%i", `${item}`));
                } else {
                    client.say(channel, set.messages.economy.shop.no_money.replaceAll("%u", state.username).replaceAll("%m", set.messages.economy.shop.flashlight.cost.toString()).replaceAll("%i", `${item}`));
                }
                break;
            case "fishing_rod":
                if(balance > set.messages.economy.shop.fishing_rod.cost) {
                    const db = admin.firestore();
                    let ref = db.collection("TiccsBot").doc("Economy").collection("Users").doc(state['user-id']);
                    let doc = (await ref.get()) as firestore.DocumentSnapshot<any>;
                    ref.set({
                        money: (doc.data().money - set.messages.economy.shop.fishing_rod.cost),
                        fishing_rod: true,
                    }, {merge: true});
                    client.say(channel, set.messages.economy.shop.bought.replaceAll("%u", state.username).replaceAll("%m", (set.messages.economy.shop.fishing_rod.cost).toString()).replaceAll("%i", `${item}`));
                } else {
                    client.say(channel, set.messages.economy.shop.no_money.replaceAll("%u", state.username).replaceAll("%m", set.messages.economy.shop.fishing_rod.cost.toString()).replaceAll("%i", `${item}`));
                }
                break;
            default:
                break;
        }
    }


    async work(state: ChatUserstate, client: Client, channel: string, args: Array<String>) {
        if(!args[1]) return client.say(channel, set.messages.economy.work_needarg.replaceAll("%u", state.username));
        switch (args[1]) {
            case "mine":
                let moneyrange = set.messages.economy.moneyranges.work.mine.range;
                let money = Math.floor(Math.random() * (moneyrange[1] - moneyrange[0]));
                let db = admin.firestore();
                let ref = db.collection("TiccsBot").doc("Economy").collection("Users").doc(state['user-id']);
                let doc = (await ref.get()) as firestore.DocumentSnapshot<any>;
                if(doc.data().pickaxe) {
                    money = ((money / 2) + money).toFixed(0) as unknown as number;
                    if(this.randomBreak()) {
                        ref.set({
                            pickaxe: false,
                        }, {merge: true});
                        client.say(channel, set.messages.economy.work_broken_item.replaceAll("%u", state.username).replaceAll("%m", money.toString()).replaceAll("%i", set.messages.economy.shop.pickaxe.name));
                    }
                }
                client.say(channel, set.messages.economy.moneyranges.work.mine.message.replaceAll("%u", state.username).replaceAll("%m", money.toString()).replaceAll("%o", set.messages.economy.moneyranges.work.mine.ores[Math.floor(Math.random() * set.messages.economy.moneyranges.work.mine.ores.length)]));
                if(!doc.exists) {
                    await ref.set({
                        money: set.messages.economy.defaults.money + money,
                        username: state.username,
                        id: state['user-id'],
                    }, {merge: true});
                } else {
                    await ref.update({
                        money: doc.data().money + money,
                    });
                }
                break;
            case "fish":
                let moneyrangefish = set.messages.economy.moneyranges.work.fish.range;
                let moneyfish = Math.floor(Math.random() * (moneyrangefish[1] - moneyrangefish[0]));
                let dbf = admin.firestore();
                let reff = dbf.collection("TiccsBot").doc("Economy").collection("Users").doc(state['user-id']);
                let docf = (await reff.get()) as firestore.DocumentSnapshot<any>;
                if(docf.data().fishing_rod) {
                    moneyfish = ((moneyfish / 2) + moneyfish).toFixed(0) as unknown as number;
                    if(this.randomBreak()) {
                        reff.set({
                            fishing_rod: false,
                        }, {merge: true});
                        client.say(channel, set.messages.economy.work_broken_item.replaceAll("%u", state.username).replaceAll("%m", moneyfish.toString()).replaceAll("%i", set.messages.economy.shop.fishing_rod.name));
                    }
                }
                client.say(channel, set.messages.economy.moneyranges.work.fish.message.replaceAll("%u", state.username).replaceAll("%m", moneyfish.toString()).replaceAll("%f", set.messages.economy.moneyranges.work.fish.fish[Math.floor(Math.random() * set.messages.economy.moneyranges.work.fish.fish.length)]));
                if(!docf.exists) {
                    await reff.set({
                        money: set.messages.economy.defaults.money + moneyfish,
                        username: state.username,
                        id: state['user-id'],
                    });
                } else {
                    await reff.update({
                        money: docf.data().money + moneyfish,
                    });
                }
                break;
            case "explore":
                let moneyrangeexplore = set.messages.economy.moneyranges.work.fish.range;
                let moneyexplore = Math.floor(Math.random() * (moneyrangeexplore[1] - moneyrangeexplore[0]));
                client.say(channel, set.messages.economy.moneyranges.work.explore.message.replaceAll("%u", state.username).replaceAll("%m", moneyexplore.toString()).replaceAll("%a", set.messages.economy.moneyranges.work.explore.area[Math.floor(Math.random() * set.messages.economy.moneyranges.work.explore.area.length)]));
                let dbe = admin.firestore();
                let refe = dbe.collection("TiccsBot").doc("Economy").collection("Users").doc(state['user-id']);
                let doce = (await refe.get()) as firestore.DocumentSnapshot<any>;
                if(doce.data().flashlight) {
                    moneyexplore = ((moneyexplore / 2) + moneyexplore).toFixed(0) as unknown as number;
                    if(this.randomBreak()) {
                        refe.set({
                            flashlight: false,
                        }, {merge: true});
                        client.say(channel, set.messages.economy.work_broken_item.replaceAll("%u", state.username).replaceAll("%m", moneyexplore.toString()).replaceAll("%i", set.messages.economy.shop.flashlight.name));
                    }
                }
                if(!doce.exists) {
                    await refe.set({
                        money: set.messages.economy.defaults.money + moneyexplore,
                        username: state.username,
                        id: state['user-id'],
                    });
                } else {
                    await refe.update({
                        money: doce.data().money + moneyexplore,
                    });
                }
                break;
            default:
                break;
        }
    }
    async gamble(state: ChatUserstate, client: Client, channel: string, args: Array<String>) {
        if(!args[2]) return client.say(channel, set.messages.economy.gamble.no_bet.replaceAll("%u", state.username));
        switch (args[1]) {
            case "dice":
                if(await this.getBalance(state) < args[2]) return client.say(channel, set.messages.economy.gamble.no_money.replaceAll("%u", state.username));
                let bet = parseInt(`${args[2]}`);
                const userrandom = Math.floor(Math.random() * 30) + 1;
                const botrandom = Math.floor(Math.random() * 20) + 1;
                let win = "draw";
                if (userrandom > botrandom) {
                    client.say(channel, set.messages.economy.gamble.wins.user.replaceAll("%u", state.username).replaceAll("%s", `${userrandom} > ${botrandom}`).replaceAll("%m", bet.toString()).replaceAll("%w", (bet / 2).toFixed(0).toString()));
                    win = "win";
                    this.addMoney(state, (bet + bet / 2).toFixed(0));
                } else if (userrandom < botrandom) {
                    client.say(channel, set.messages.economy.gamble.wins.bot.replaceAll("%u", state.username).replaceAll("%s", `${userrandom} < ${botrandom}`).replaceAll("%m", bet.toString()));
                    win = "lose";
                    this.removeMoney(state, (bet).toFixed(0));
                } else {
                    client.say(channel, set.messages.economy.gamble.wins.draw.replaceAll("%u", state.username).replaceAll("%s", `${userrandom} = ${botrandom}`).replaceAll("%m", bet.toString()));
                    win = "draw";
                }
                break;
            case "superdice":
                if(await this.getBalance(state) < args[2]) return client.say(channel, set.messages.economy.gamble.no_money.replaceAll("%u", state.username));
                if(!args[3]) return client.say(channel, set.messages.economy.gamble.no_enought_args.replaceAll("%u", state.username));
                let bets = parseInt(`${args[2]}`);
                let number = parseInt(`${args[3]}`);
                if(number < 1 || number > 20) return client.say(channel, set.messages.economy.gamble.no_correct_bet.replaceAll("%u", state.username));
                const botrandoms = Math.floor(Math.random() * 25) + 1;
                if (number > botrandoms) {
                    client.say(channel, set.messages.economy.gamble.wins.user.replaceAll("%u", state.username).replaceAll("%s", `${number} > ${botrandoms}`).replaceAll("%m", bets.toString()).replaceAll("%w", ((20 - number) * (bets / 2)).toFixed(0)));
                    this.addMoney(state, (bets + bets / 2).toFixed(0));
                } else if (number < botrandoms) {
                    client.say(channel, set.messages.economy.gamble.wins.bot.replaceAll("%u", state.username).replaceAll("%s", `${number} < ${botrandoms}`).replaceAll("%m", bets.toString()));
                    this.removeMoney(state, (bets).toFixed(0));
                } else {
                    client.say(channel, set.messages.economy.gamble.wins.draw.replaceAll("%u", state.username).replaceAll("%s", `${number} = ${botrandoms}`).replaceAll("%m", bets.toString()));
                }
            break;
            case "help":
                client.say(channel, set.messages.economy.gamble.help.replaceAll("%u", state.username));
            default:
                break;
        }
    }

    async getBalance(state: ChatUserstate) {
        const db = admin.firestore();
        let ref = db.collection("TiccsBot").doc("Economy").collection("Users").doc(state['user-id']);
        let doc = (await ref.get()) as firestore.DocumentSnapshot<any>;
        if(!doc.exists) {
            await ref.set({
                money: set.messages.economy.defaults.money,
                username: state.username,
                id: state['user-id'],
            }, {merge: true});
            return set.messages.economy.defaults.money;
        } else { 
            return doc.data().money;
        }
    }

    async addMoney(state: ChatUserstate, money: string) {
        const db = admin.firestore();
        let ref = db.collection("TiccsBot").doc("Economy").collection("Users").doc(state['user-id']);
        let doc = (await ref.get()) as firestore.DocumentSnapshot<any>;
        const newmoney = parseInt(`${money}`);
        const dcmoney = doc.data().money;
        await ref.update({
            money: (dcmoney + newmoney),
        });
    }

    async removeMoney(state: ChatUserstate, money: string) {
        const db = admin.firestore();
        let ref = db.collection("TiccsBot").doc("Economy").collection("Users").doc(state['user-id']);
        let doc = (await ref.get()) as firestore.DocumentSnapshot<any>;
        const newmoney = parseInt(`${money}`);
        const dcmoney = doc.data().money;
        await ref.update({
            money: (dcmoney - newmoney),
        });
    }

    async randomBreak() {
        const random = Math.floor(Math.random() * 50) + 1;
        if(random == 1) {
            return true;
        } else {
            return false;
        }
    }
}*/