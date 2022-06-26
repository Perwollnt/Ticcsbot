import { ChatUserstate, Client } from 'tmi.js';
import { BotCommand, CommandConfig, CommandRequire } from '../utils/interfaces';
import * as set from '../config';
import { Economy as messages, EconomyItems as items, Jobs as jobs } from '../config';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';


export class RealEconomyCommand implements BotCommand {
    config: CommandConfig = {
        name: "economy",
        aliases: ["e", "econ"],
        cooldown: 1,
        enabled: true,
        description: "Economy command",
    }
    
    require: CommandRequire = {
        developer: false,
        mod: true,
        sub: false,
        follower: false,
        user: false,

    };
    
    onTriggered = async (client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) => {
        const db = admin.firestore();
        const ref = db.collection("TiccsBot").doc("Economy").collection("Users").doc(state['user-id']);
        const hasitems: string[] = [];
        if(!(await ref.get()).exists) {
            ref.set({ 
                money: messages.defaults.money,
                username: state.username,
                userid: state['user-id'],
                spear: false,
                sword: false,
                gun: false,
                fishing_rod: false,
                fancy_boots: false,
                rope: false,
                shovel: false,
                fishing_net: false,
                pickaxe: false,
                flashlight: false,
            });

        }
            const doc = await (await ref.get()).data();
            if(await doc.spear as boolean) hasitems.push(items.spear.name);
            if(await doc.sword as boolean) hasitems.push(items.sword.name);
            if(await doc.gun as boolean) hasitems.push(items.gun.name);
            if(await doc.fishing_rod as boolean) hasitems.push(items.fishing_rod.name);
            if(await doc.fancy_boots as boolean) hasitems.push(items.fancy_boots.name);
            if(await doc.rope as boolean) hasitems.push(items.rope.name);
            if(await doc.shovel as boolean) hasitems.push(items.shovel.name);
            if(await doc.fishing_net as boolean) hasitems.push(items.fishing_net.name);
            if(await doc.pickaxe as boolean) hasitems.push(items.pickaxe.name);
            if(await doc.flashlight as boolean) hasitems.push(items.flashlight.name);
        if(!args[0]) return client.say(channel, messages.help.message.replace("%u", state.username));
        switch (args[0]) {
            case "work": case "job":
                this.work(client, channel, state, message, args, hasitems);
                break;
            case "shop": case "buy":
                this.shop(client, channel, state, message, args);
                break;
            case "gamble": case "luck":
                this.gamble(client, channel, state, message, args);
                break;
            default:
                break;
        }
    }
    async work(client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>, hasitems: String[]) {
        if(!args[1]) return client.say(channel, messages.work.need_arg.replace("%u", state.username));
        switch (args[1]) {
            case "mine":
                this.mine(client, channel, state, message, args, hasitems);
                break;
            case "fish":
                this.fish(client, channel, state, message, args, hasitems);
                break;
            case "explore":
                this.explore(client, channel, state, message, args, hasitems);
                break;
            case "hunt":
                this.hunt(client, channel, state, message, args, hasitems);
                break;
            default:
                break;
        }
    }
    async mine(client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>, hasitems: String[]) {
        const mine = jobs.mine;
        const helps = [items.fancy_boots, items.rope, items.shovel, items.flashlight, items.pickaxe];
        let randomCoins = Math.floor(Math.random() * mine.moneyrange[1]) + 1;
        const randomItems = Math.floor(Math.random() * mine.itemrange[1]) + 1;
        const gotItems = [];
        for(let e = 0; e < randomItems; e++) gotItems.push(mine.ores[Math.floor(Math.random() * mine.ores.length)]);
        const gotItemsCount = gotItems.reduce((acc, cur) => {
            acc[cur] = (acc[cur] || 0) + 1;
            return acc;
        }, {});
        console.log(gotItemsCount.stone);
        randomCoins = randomCoins + (
            ((gotItemsCount[mine.orenames.stone] || 0) * mine.prices.stone) + 
            ((gotItemsCount[mine.orenames.iron] || 0) * mine.prices.iron) + 
            ((gotItemsCount[mine.orenames.gold] || 0) * mine.prices.gold) + 
            ((gotItemsCount[mine.orenames.diamond] || 0) * mine.prices.diamond) + 
            ((gotItemsCount[mine.orenames.emerald] || 0) * mine.prices.emerald) + 
            ((gotItemsCount[mine.orenames.quartz] || 0) * mine.prices.quartz) + 
            ((gotItemsCount[mine.orenames.coal] || 0) * mine.prices.coal));
        const gotItemsString = Object.keys(gotItemsCount).map(key => `${gotItemsCount[key]}x ${key}`).join(", ");
        client.say(channel, jobs.mine.messages[Math.floor(Math.random() * jobs.mine.messages.length)].replace("%u", state.username).replace("%m", `${randomCoins}`).replace("%i", gotItemsString));
        const db = admin.firestore();
        const ref = db.collection("TiccsBot").doc("Economy").collection("Users").doc(state['user-id']);
        let hadItems = false;
        for(let e of hasitems) {
            for(let a of helps) {
                if(e == a.name) {
                    hadItems = true;
                    randomCoins = randomCoins * a.boost;
                }
            }
        }

        if(hadItems) {
            client.say(channel, messages.work.boost_items.replace("%u", state.username));
        }

        randomCoins = ((await ref.get()).data().money as number + randomCoins as number);
        ref.update({ money: randomCoins });
    }
    async fish(client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>, hasitems: String[]) {
        const fish = jobs.fish;
        const helps = [items.fishing_net, items.rope, items.fishing_rod, items.gun, items.spear];
        let randomCoins = Math.floor(Math.random() * fish.moneyrange[1]) + 1;
        const randomItems = Math.floor(Math.random() * fish.itemrange[1]) + 1;
        const gotItems = [];
        for(let e = 0; e < randomItems; e++) gotItems.push(fish.fish[Math.floor(Math.random() * fish.fish.length)]);
        const gotItemsCount = gotItems.reduce((acc, cur) => {
            acc[cur] = (acc[cur] || 0) + 1;
            return acc;
        }, {});
        randomCoins = randomCoins + (
            ((gotItemsCount[fish.fishnames.cod] || 0) * fish.prices.cod) + 
            ((gotItemsCount[fish.fishnames.clownfish] || 0) * fish.prices.clownfish) + 
            ((gotItemsCount[fish.fishnames.dolphin] || 0) * fish.prices.dolphin) + 
            ((gotItemsCount[fish.fishnames.jellyfish] || 0) * fish.prices.jellyfish) + 
            ((gotItemsCount[fish.fishnames.pufferfish] || 0) * fish.prices.pufferfish) + 
            ((gotItemsCount[fish.fishnames.salmon] || 0) * fish.prices.salmon));
        let gotItemsString = Object.keys(gotItemsCount).map(key => `${gotItemsCount[key]}x ${key}`).join(", ");
        const db = admin.firestore();
        const ref = db.collection("TiccsBot").doc("Economy").collection("Users").doc(state['user-id']);
        let hadItems = false;
        for(let e of hasitems) {
            for(let a of helps) {
                if(e == a.name) {
                    hadItems = true;
                    randomCoins = randomCoins * a.boost;
                }
            }
        }
        if(hadItems) {
            client.say(channel, messages.work.boost_items.replace("%u", state.username));
        }
        randomCoins = parseInt(randomCoins.toFixed(0)) as number;
        if(gotItemsString.length < 1) gotItemsString = fish.nothing;
        client.say(channel, jobs.fish.messages[Math.floor(Math.random() * jobs.fish.messages.length)].replace("%u", state.username).replace("%m", `${randomCoins}`).replace("%i", gotItemsString));
        randomCoins = (await (await ref.get()).data().money +randomCoins);
        ref.set({ money: randomCoins }, { merge: true });
    }
    async explore(client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>, hasitems: String[]) {
        const explore = jobs.explore;
        const helps = [items.fancy_boots, items.rope, items.gun, items.shovel, items.spear, items.sword];
        let randomCoins = Math.floor(Math.random() * explore.moneyrange[1]) + 1;
        const randomItems = Math.floor(Math.random() * explore.itemrange[1]) + 1;
        //get random index from array
        const gotItems = [];
        const biome = explore.area[Math.floor(Math.random() * explore.area.length)];
        console.log(biome);
        const db = admin.firestore();
        const ref = db.collection("TiccsBot").doc("Economy").collection("Users").doc(state['user-id']);
        let hadItems = false;
        for(let e of hasitems) {
            for(let a of helps) {
                if(e == a.name) {
                    hadItems = true;
                    randomCoins = randomCoins * a.boost;
                }
            }
        }
        if(hadItems) {
            client.say(channel, messages.work.boost_items.replace("%u", state.username));
        }
        randomCoins = parseInt(randomCoins.toFixed(0)) as number;
        client.say(channel, jobs.explore.messages[Math.floor(Math.random() * jobs.explore.messages.length)].replace("%u", state.username).replace("%m", `${randomCoins}`).replace("%b", biome));
        randomCoins = (await (await ref.get()).data().money +randomCoins);
        ref.set({ money: randomCoins }, { merge: true });
    }
    async hunt(client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>, hasitems: String[]) {
        const fish = jobs.hunt;
        const helps = [items.fishing_net, items.rope, items.fishing_rod, items.gun, items.spear, items.sword];
        let randomCoins = Math.floor(Math.random() * fish.moneyrange[1]) + 1;
        const randomItems = Math.floor(Math.random() * fish.itemrange[1]) + 1;
        const gotItems = [];
        for(let e = 0; e < randomItems; e++) gotItems.push(fish.animals[Math.floor(Math.random() * fish.animals.length)]);
        const gotItemsCount = gotItems.reduce((acc, cur) => {
            acc[cur] = (acc[cur] || 0) + 1;
            return acc;
        }, {});
        randomCoins = randomCoins + (
            ((gotItemsCount[fish.animalsnames.bear] || 0) * fish.prices.bear) + 
            ((gotItemsCount[fish.animalsnames.chicken] || 0) * fish.prices.chicken) + 
            ((gotItemsCount[fish.animalsnames.dolphin] || 0) * fish.prices.dolphin) + 
            ((gotItemsCount[fish.animalsnames.fox] || 0) * fish.prices.fox) + 
            ((gotItemsCount[fish.animalsnames.jellyfish] || 0) * fish.prices.jellyfish) + 
            ((gotItemsCount[fish.animalsnames.pig] || 0) * fish.prices.pig) + 
            ((gotItemsCount[fish.animalsnames.rabbit] || 0) * fish.prices.rabbit) + 
            ((gotItemsCount[fish.animalsnames.sheep] || 0) * fish.prices.sheep) + 
            ((gotItemsCount[fish.animalsnames.whale] || 0) * fish.prices.whale));
        let gotItemsString = Object.keys(gotItemsCount).map(key => `${gotItemsCount[key]}x ${key}`).join(", ");
        const db = admin.firestore();
        const ref = db.collection("TiccsBot").doc("Economy").collection("Users").doc(state['user-id']);
        let hadItems = false;
        for(let e of hasitems) {
            for(let a of helps) {
                if(e == a.name) {
                    hadItems = true;
                    randomCoins = randomCoins * a.boost;
                }
            }
        }
        if(hadItems) {
            client.say(channel, messages.work.boost_items.replace("%u", state.username));
        }
        randomCoins = parseInt(randomCoins.toFixed(0)) as number;
        client.say(channel, jobs.hunt.messages[Math.floor(Math.random() * jobs.hunt.messages.length)].replace("%u", state.username).replace("%m", `${randomCoins}`).replace("%a", gotItemsString));
        randomCoins = (await (await ref.get()).data().money +randomCoins);
        ref.set({ money: randomCoins }, { merge: true });
    }
    //---------------------------------------------------------------------------------------------------------------------------------
    async shop(client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) {
        const msg = `${items.fancy_boots.name}, ${items.fishing_net.name}, ${items.fishing_rod.name}, ${items.flashlight.name}, ${items.gun.name}, ${items.pickaxe.name}, ${items.rope.name}, ${items.shovel.name}, ${items.spear.name}, ${items.sword.name}`;
        if(!args[1]) return client.say(channel, messages.shop.needarg.replace("%u", state.username).replaceAll("%a", msg));
        const balance = await this.getBalance(state);
        let item;
        switch (args[1].toLowerCase()) {
            case items.fancy_boots.name.toLowerCase(): case items.fancy_boots.name:
                item = items.fancy_boots;
                break;
            case items.fishing_net.name.toLowerCase(): case items.fishing_net.name:
                item = items.fishing_net;
                break;
            case items.fishing_rod.name.toLowerCase(): case items.fishing_rod.name:
                item = items.fishing_rod;
                break;
            case items.flashlight.name.toLowerCase(): case items.flashlight.name:
                item = items.flashlight;
                break;
            case items.gun.name.toLowerCase(): case items.gun.name:
                item = items.gun;
                break;
            case items.pickaxe.name.toLowerCase(): case items.pickaxe.name:
                item = items.pickaxe;
                break;
            case items.rope.name.toLowerCase(): case items.rope.name:
                item = items.rope;
                break;
            case items.shovel.name.toLowerCase(): case items.shovel.name:
                item = items.shovel;
                break;
            case items.spear.name.toLowerCase(): case items.spear.name:
                item = items.spear;
                break;
            case items.sword.name.toLowerCase(): case items.sword.name:
                item = items.sword;
                break;
            default:
                break;
        }
        switch (args[1].toLowerCase()) {
            case items.spear.name.toLowerCase():
                if(balance > items.spear.cost) {
                    client.say(channel, messages.shop.bought.replace("%u", state.username).replace("%i", items.spear.name).replaceAll("%m", `${items.spear.cost}`));
                    await this.addItem(state, items.spear.name);
                    await this.removeMoney(state, `${items.spear.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", items.spear.name).replaceAll("%m", `${items.spear.cost}`));
                }
                break;
            case items.sword.name.toLowerCase():
                if(balance > item.cost) {
                    client.say(channel, messages.shop.bought.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            case items.gun.name.toLowerCase():
                if(balance > item.cost) {
                    client.say(channel, messages.shop.bought.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            case items.fishing_rod.name.toLowerCase():
                if(balance > item.cost) {
                    client.say(channel, messages.shop.bought.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            case items.fancy_boots.name.toLowerCase():
                if(balance > item.cost) {
                    client.say(channel, messages.shop.bought.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            case items.rope.name.toLowerCase():
                if(balance > item.cost) {
                    client.say(channel, messages.shop.bought.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            case items.shovel.name.toLowerCase():
                if(balance > item.cost) {
                    client.say(channel, messages.shop.bought.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            case items.fishing_net.name.toLowerCase():
                if(balance > item.cost) {
                    client.say(channel, messages.shop.bought.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            case items.pickaxe.name.toLowerCase():
                if(balance > item.cost) {
                    client.say(channel, messages.shop.bought.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            case items.flashlight.name.toLowerCase():
                if(balance > item.cost) {
                    client.say(channel, messages.shop.bought.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            default:
                break;
        }
    }
    async addItem(state: ChatUserstate, name: string) {
        const db = admin.firestore();
        let ref = db.collection("TiccsBot").doc("Economy").collection("Users").doc(state['user-id']);
        let doc = (await ref.get()) as firestore.DocumentSnapshot<any>;
        ref.set({
            [name]: true,
        }, { merge: true });
    }
    async getBalance(state: ChatUserstate) {
        const db = admin.firestore();
        let ref = db.collection("TiccsBot").doc("Economy").collection("Users").doc(state['user-id']);
        let doc = (await ref.get()) as firestore.DocumentSnapshot<any>;
        if(!doc.exists) {
            await ref.set({
                money: messages.defaults.money,
                username: state.username,
                id: state['user-id'],
            }, {merge: true});
            return messages.defaults.money;
        } else { 
            return doc.data().money;
        }
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
    //---------------------------------------------------------------------------------------------------------------------------------
    async gamble(client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) {
        let type = args[1];
        if(!type) return client.say(channel, messages.gamble.no_real_args_dice.replaceAll("%u", state.username));
        let amount = args[2];
        if(!amount) return client.say(channel, messages.gamble.no_real_args_money.replaceAll("%u", state.username));
        let balance = await this.getBalance(state);
        if(balance < amount) return client.say(channel, messages.gamble.no_money.replaceAll("%u", state.username).replaceAll("%m", balance));
        switch (type.toLowerCase()) {
            case "dice":
                this.dice(client, channel, state, message, args, balance, parseInt(`${amount}`));
                break;
            case "superdice":
                console.log("Superdice");
                break;
            default:
                break;
        }
    }
    async dice(client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>, balance: number, amount: number) {
        const botRandom = Math.floor(Math.random() * 25) + 1;
        const userRandom = Math.floor(Math.random() * 30) + 1;
        const coins = args[1];
        let winner = "";
        let wincoins = 0;
        if(botRandom > userRandom) winner = "bot";
        if(botRandom < userRandom) winner = "user";
        if(botRandom == userRandom) winner = "draw";
        switch (winner) {
            case "bot":
                client.say(channel, messages.gamble.wins.bot.replaceAll("%un", state.username).replaceAll("%bw", `${botRandom}`).replaceAll("%uw", `${userRandom}`).replaceAll("%m", `${amount}`));
                this.removeMoney(state, `${amount}`);
                break;
            case "user":
                wincoins = amount + (amount / 2);
                this.addMoney(state, `${wincoins}`);
                client.say(channel, messages.gamble.wins.user.replaceAll("%un", state.username).replaceAll("%bw", `${botRandom}`).replaceAll("%uw", `${userRandom}`).replaceAll("%m", `${amount}`).replaceAll("%w", `${wincoins}`));
                break;
            case "draw":
                client.say(channel, messages.gamble.wins.draw.replaceAll("%un", state.username).replaceAll("%bw", `${botRandom}`).replaceAll("%uw", `${userRandom}`).replaceAll("%m", `${amount}`));
                break;
            default:
                break;
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
    async superDice(client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>, balance: number, amount: number) {
        const botRandom = Math.floor(Math.random() * 25) + 1;
        const userRandom = parseInt(`${args[3]}`);
        const bet = amount;
        if(userRandom < 1 || userRandom > 20) return client.say(channel, messages.gamble.no_correct_bet.replaceAll("%u", state.username));
        if (userRandom > botRandom) {
            client.say(channel, messages.gamble.wins.user.replaceAll("%u", state.username).replaceAll("%s", `${userRandom} > ${botRandom}`).replaceAll("%m", bet.toString()).replaceAll("%w", ((20 - userRandom) * (bet / 2)).toFixed(0)));
            this.addMoney(state, (bet + bet / 2).toFixed(0));
        } else if (userRandom < botRandom) {
            client.say(channel, messages.gamble.wins.bot.replaceAll("%u", state.username).replaceAll("%s", `${userRandom} < ${botRandom}`).replaceAll("%m", bet.toString()));
            this.removeMoney(state, (bet).toFixed(0));
        } else {
            client.say(channel, messages.gamble.wins.draw.replaceAll("%u", state.username).replaceAll("%s", `${userRandom} = ${botRandom}`).replaceAll("%m", bet.toString()));
        }
    
    
    }   
}