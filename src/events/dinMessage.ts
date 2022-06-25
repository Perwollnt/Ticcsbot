import { ChatUserstate, Client } from "tmi.js";
import { chatcmds } from "../config";
export async function Command(message: String, args: Array<String>, client: Client, channel: string, state: ChatUserstate) {
    const cmd = message.replace("!!", "");
    for(let e of chatcmds) {
        if(e.name == cmd) {
            client.say(channel, e.value);
            break;
        }
    }
}