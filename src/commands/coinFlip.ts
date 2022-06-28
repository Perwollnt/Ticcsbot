import { ChatUserstate, Client } from 'tmi.js';
import { BotCommand, CommandConfig, CommandRequire } from '../utils/interfaces';
import * as set from '../config';
import { Database } from '../helpers/dbCache';


export class FlipCommand implements BotCommand {
    config: CommandConfig = {
        name: "coinflip",
        aliases: ["cf", "coin", 'flip'],
        cooldown: 1,
        enabled: true,
        description: "Flip a coin",
    }
    require: CommandRequire = {
        developer: false,
        mod: true,
        sub: false,
        follower: false,
        user: false,

    };

    db = new Database();

    onTriggered = async (client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) => {
        const cmd = set.commands.coinFlip;
        const side = [cmd.heads, cmd.tails][Math.floor(Math.random() * [cmd.heads, cmd.tails].length)];
        client.say(channel, cmd.flipMessage.replace('%s', side).replaceAll('%u', state.username));
    }
    
}