import { BotEvent } from "../utils/interfaces";
import { ChatUserstate, Client, Events } from 'tmi.js';
import { checkTheCommand } from '../utils/checkers';

export default class MessageEvent implements BotEvent {
    name: keyof Events = "message";

    onTriggered = async (client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) => {
        if(state.self) return;
        await checkTheCommand(client, channel, state, message);
    }
}