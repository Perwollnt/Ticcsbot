import { ChatUserstate, Client } from 'tmi.js';

import * as set from '../config';
import { BotCommand, CommandConfig, CommandRequire } from '../utils/interfaces';

export class EightBallCommand implements BotCommand {
    config: CommandConfig = {
        name: "8ball",
        aliases: ["magic", "luck", "szerencse"],
        cooldown: 1,
        enabled: true,
        description: "Ask the magic 8ball a question",
    }
    require: CommandRequire = {
        developer: false,
        mod: false,
        sub: false,
        follower: false,
        user: false,

    };

    messages = set.messages.Eightball.answers;
    onTriggered = async (client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) => {
        const answer = this.messages[Math.floor(Math.random() * this.messages.length)];
        client.say(channel, set.messages.Eightball.message.replaceAll("%u", state['display-name']).replaceAll("%answer", answer));
    }
    
}