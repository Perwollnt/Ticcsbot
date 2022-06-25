import { BotEvent } from "../utils/interfaces";
import { ChatUserstate, Client, Events } from 'tmi.js';
import { checkTheCommand } from '../utils/checkers';
import * as cc from './dinMessage';
import { AutoMessagerCommand } from "../commands/AutoMessager";


export default class MessageEvent implements BotEvent {
    name: keyof Events = "message";
    amsgmanager = new AutoMessagerCommand();
    onTriggered = async (client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) => {
        if(state.self) return;
        this.amsgmanager.numup();
        if(message.includes("!!")) cc.Command(message, args, client, channel, state);
        await checkTheCommand(client, channel, state, message);
    }
}