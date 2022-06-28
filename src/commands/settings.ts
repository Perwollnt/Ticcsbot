import { ChatUserstate, Client } from 'tmi.js';
import { BotCommand, CommandConfig, CommandRequire } from '../utils/interfaces';
import * as set from '../config';
import { Database } from '../helpers/dbCache';


export class SettingsCommand implements BotCommand {
    config: CommandConfig = {
        name: "settings",
        aliases: ["stx", "stCommand"],
        cooldown: 1,
        enabled: true,
        description: "Edit bot settings",
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
        const stx = await this.db.get("TiccsBot/Settings");
        const cmd = set.commands.settings;
        console.log(stx);
        if(!args[0]) return client.say(channel, cmd.novalue.replace("%u", state.username).replaceAll("%onv", `${cmd.values.on}`).replaceAll("%offv", `${cmd.values.off}`));
        const whattodo = args[0];
        //TODO: finish this shit later

    }
    
}