import { ChatUserstate, Client } from 'tmi.js';
import { BotCommand, CommandConfig, CommandRequire } from '../utils/interfaces';


export class AutoMessagerCommand implements BotCommand {
    config: CommandConfig = {
        name: "amsg",
        aliases: ["automessager", "AutoMessager"],
        cooldown: 1,
        enabled: true,
        description: "Manage auto messager stuff",
    }
    require: CommandRequire = {
        developer: true,
        mod: true,
        sub: false,
        follower: false,
        user: false,

    };

    client: Client;
    channel: string;
    state: ChatUserstate;
    message:String;
    args: Array<String>;

    onTriggered = async (client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) => {
        //add, list, remove, edit, enable, disable | default message
        
        switch (args[0]) {
            case "add":
                this.add();
                break;
            case "list":
                break;
            case "remove":
                break;
            case "edit":
                break;
            case "enable":
                break;
            case "disable":
                break;
            default:
                break;
        }
    }
    async add() {}
    async list() {}
    async remove() {}
    async edit() {}
    async enable() {}
    async disable() {}
}