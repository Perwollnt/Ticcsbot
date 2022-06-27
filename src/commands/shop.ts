import { ChatUserstate, Client } from 'tmi.js';
import { BotCommand, CommandConfig, CommandRequire } from '../utils/interfaces';
import * as set from '../config';
import { Database } from '../helpers/dbCache';
import { Economy as messages, EconomyItems as items, Jobs as jobs } from "../config";


export class ShopCommand implements BotCommand {
    config: CommandConfig = {
        name: "shop",
        aliases: ["sh", "shopcommand"],
        cooldown: 20,
        enabled: true,
        description: "Economy shop command!",
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
        const msg = `${items.fancy_boots.name}, ${items.fishing_net.name}, ${items.fishing_rod.name}, ${items.flashlight.name}, ${items.gun.name}, ${items.pickaxe.name}, ${items.rope.name}, ${items.shovel.name}, ${items.spear.name}, ${items.sword.name}`;
        if(!args[0]) return client.say(channel, messages.shop.needarg.replace("%u", state.username).replaceAll("%a", msg));
        const balance = await this.getBalance(state);
        let item;
        switch (args[0].toLowerCase()) {
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
        switch (args[0].toLowerCase()) {
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
                    client.say(channel, shopBoughtMessage(messages, item));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            case items.gun.name.toLowerCase():
                if(balance > item.cost) {
                    client.say(channel, shopBoughtMessage(messages, item));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            case items.fishing_rod.name.toLowerCase():
                if(balance > item.cost) {
                    client.say(channel, shopBoughtMessage(messages, item));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            case items.fancy_boots.name.toLowerCase():
                if(balance > item.cost) {
                    client.say(channel, shopBoughtMessage(messages, item));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            case items.rope.name.toLowerCase():
                if(balance > item.cost) {
                    client.say(channel, shopBoughtMessage(messages, item));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            case items.shovel.name.toLowerCase():
                if(balance > item.cost) {
                    client.say(channel, shopBoughtMessage(messages, item));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            case items.fishing_net.name.toLowerCase():
                if(balance > item.cost) {
                    client.say(channel, shopBoughtMessage(messages, item));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            case items.pickaxe.name.toLowerCase():
                if(balance > item.cost) {
                    client.say(channel, shopBoughtMessage(messages, item));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            case items.flashlight.name.toLowerCase():
                if(balance > item.cost) {
                    client.say(channel, shopBoughtMessage(messages, item));
                    await this.addItem(state, item.name);
                    await this.removeMoney(state, `${item.cost}`);
                } else {
                    client.say(channel, messages.shop.no_money.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`));
                }
                break;
            default:
                break;
            
            function shopBoughtMessage (messages: any, item: any) {
                return messages.shop.bought.replace("%u", state.username).replace("%i", item.name).replaceAll("%m", `${item.cost}`);
            }
        }
    }
    
    async addItem(state: ChatUserstate, name: string) {
        this.db.set(`TiccsBot/Economy/Users/${state['user-id']}`, { [name]: true });
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
    
}