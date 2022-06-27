import { ChatUserstate, Client } from 'tmi.js';
import { BotCommand, CommandConfig, CommandRequire } from '../utils/interfaces';
import * as set from '../config';
import { Database } from '../helpers/dbCache';
import { Economy as messages, EconomyItems as items, Jobs as jobs } from "../config";

export class GambleCommand implements BotCommand {
    config: CommandConfig = {
        name: "gamble",
        aliases: ["ga", "gambleCommand"],
        cooldown: 1,
        enabled: true,
        description: "test command",
    }
    require: CommandRequire = {
        developer: false,
        mod: false,
        sub: false,
        follower: false,
        user: false,

    };

    db = new Database();

    onTriggered = async (client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) => {
        let type = args[0];
        if(!type) return client.say(channel, messages.gamble.no_real_args_dice.replaceAll("%u", state.username));
        let amount = args[1];
        if(!amount) return client.say(channel, messages.gamble.no_real_args_money.replaceAll("%u", state.username));
        let balance = await this.getBalance(state);
        if(balance < amount) return client.say(channel, messages.gamble.no_money.replaceAll("%u", state.username).replaceAll("%m", balance));
        switch (type.toLowerCase()) {
            case "dice":
                this.dice(client, channel, state, message, args, balance, parseInt(`${amount}`));
                break;
            case "superdice":
                this.superDice(client, channel, state, message, args, balance, parseInt(`${amount}`));
                break;
            default:
                break;
        }
    }

    async dice(client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>, balance: number, amount: number) {
        const botRandom = Math.floor(Math.random() * 25) + 1;
        const userRandom = Math.floor(Math.random() * 30) + 1;
        const coins = args[0];
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

    async superDice(client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>, balance: number, amount: number) {
        const botRandom = Math.floor(Math.random() * 25) + 1;
        const userRandom = parseInt(`${args[2]}`);
        const bet = amount;
        if(userRandom < 1 || userRandom > 20) return client.say(channel, messages.gamble.no_correct_bet.replaceAll("%u", state.username));
        if (userRandom > botRandom) {
            client.say(channel, messages.gamble.wins.user.replaceAll("%un", state.username).replaceAll("%bw", `${botRandom}`).replaceAll("%uw", `${userRandom}`).replaceAll("%m", bet.toString()).replaceAll("%w", ((20 - userRandom) * (bet / 2)).toFixed(0)));
            this.addMoney(state, (bet + bet / 2).toFixed(0));
        } else if (userRandom < botRandom) {
            client.say(channel, messages.gamble.wins.bot.replaceAll("%un", state.username).replaceAll("%bw", `${botRandom}`).replaceAll("%uw", `${userRandom}`).replaceAll("%m", bet.toString()));
            this.removeMoney(state, (bet).toFixed(0));
        } else {
            client.say(channel, messages.gamble.wins.draw.replaceAll("%un", state.username).replaceAll("%bw", `${botRandom}`).replaceAll("%uw", `${userRandom}`).replaceAll("%m", bet.toString()));
        }
    }

    async addItem(state: ChatUserstate, name: string) {
        let doc = this.db.get("TiccsBot/Economy/Users/" + state['user-id']);
        this.db.set("TiccsBot/Economy/Users/" + state['user-id'], {[name]: true});
    }

    async getBalance(state: ChatUserstate) {
        let doc = await this.db.get(`TiccsBot/Economy/Users/${state['user-id']}`);
        if(!doc) {
            const c = {
                money: messages.defaults.money,
                username: state.username,
                id: state['user-id'],
            }
            this.db.set(`TiccsBot/Economy/Users/${state['user-id']}`, c);
            return c.money;
        } else { 
            return doc.money;
        }
    }

    async removeMoney(state: ChatUserstate, money: string) {
        let doc = await this.db.get(`TiccsBot/Economy/Users/${state['user-id']}`);
        const newmoney = parseInt(`${money}`);
        const dcmoney = doc.money;
        this.db.set(`TiccsBot/Economy/Users/${state['user-id']}`, { money: (dcmoney - newmoney) });
    }

    async addMoney(state: ChatUserstate, money: string) {
        let doc = await this.db.get("TiccsBot/Economy/Users/" + state['user-id']);
        const newmoney = parseInt(`${money}`);
        const dcmoney = doc.money;
        this.db.set("TiccsBot/Economy/Users/" + state['user-id'], {money: dcmoney + newmoney});
    }
}