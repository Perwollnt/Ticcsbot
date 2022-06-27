import { ChatUserstate, Client } from 'tmi.js';
import { BotCommand, CommandConfig, CommandRequire } from '../utils/interfaces';
import * as set from '../config';
import { Database } from '../helpers/dbCache';


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

    db = new Database();

    onTriggered = async (client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) => {
        const coins = await this.db.get("TiccsBot/Economy/Users/" + state['user-id']);
        let c = parseInt(coins.money + 10000);
        this.db.set("TiccsBot/Economy/Users/" + state['user-id'], { money: c });
    }
    
}