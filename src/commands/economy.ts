import { ChatUserstate, Client } from 'tmi.js';
import { BotCommand, CommandConfig, CommandRequire } from '../utils/interfaces';
import * as set from '../config';
import { Database } from '../helpers/dbCache';


export class EconomyCommand implements BotCommand {
    config: CommandConfig = {
        name: "economy",
        aliases: ["e", "economyCommand"],
        cooldown: 1,
        enabled: true,
        description: "Work, shop, gamble help message",
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
        client.say(channel, set.Economy.help.message.replaceAll("%u", state.username).replaceAll("%wc", set.Economy.help.commands.work).replaceAll("%sc", set.Economy.help.commands.shop).replaceAll("%gc", set.Economy.help.commands.gamble));
    }
    
}