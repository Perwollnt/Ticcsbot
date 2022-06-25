import { ChatUserstate, Client } from 'tmi.js';
import { BotCommand, CommandConfig, CommandRequire } from '../utils/interfaces';
import * as set from '../config';

export class TestCommand implements BotCommand {
    config: CommandConfig = {
        name: "test",
        aliases: ["teszt", "testCommand"],
        cooldown: 1,
        enabled: true,
        description: "test command",
    }
    require: CommandRequire = {
        developer: false,
        mod: true,
        sub: false,
        follower: false,
        user: false,

    };
    onTriggered = async (client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) => {
        client.say(channel, "Test command triggered");
    }
    
}