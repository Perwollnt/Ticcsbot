import { Collection } from "@discordjs/collection";
import { ChatUserstate, Client} from "tmi.js";
import { commandList as commands } from "../stuff/Client";
import { botconfig as config } from '../config';
import { messages } from "../config";
import { BotCommand } from "./interfaces";
import { chmod } from "fs";

const cooldown = new Collection<String, Collection<String, number>>();

export async function checkTheCommand(client: Client, channel: string, state: ChatUserstate, message: String) {
    const prefix = config.prefix;
    if(message.toLocaleLowerCase().indexOf(prefix) !== 0) return;

    const args = message.slice(prefix.length).trim().split(/ +/g);
    const command = (args.shift() as string).toLowerCase();

    try {
        const cmd: BotCommand | undefined = commands.get(command) || commands.find(cmd => cmd.config.aliases && cmd.config.aliases.includes(command));
        if(!cmd) return;

        const authorId = state["user-id"] as String;

        if(cmd.config.enabled !== true) return;
        if(cmd.require.developer && !isDeveloper(authorId, state)) return;
        if(cmd.require.mod && !isMod(state)) return;
        if(cmd.require.sub && !isSub(state)) return;
        if(cmd.require.follower && !isFollower(state)) return;

        if (!cooldown.has(cmd.config.name)) cooldown.set(cmd.config.name, new Collection<string, number>());
        const now = Date.now();
        const timestamps = cooldown.get(cmd.config.name);
        const cooldownAmount = cmd.config.cooldown * 1000;

        if (timestamps.has(authorId)) {
            const currentTime = timestamps.get(authorId);

            if(typeof currentTime === "undefined") {
                const expirationTime = (currentTime as number) + cooldownAmount;

                if(now < expirationTime) {
                    const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
                    return client.say(channel, messages.cooldown.replace("%t", timeLeft).replace("%u", state["display-name"]));
                }
            }
        }
        if(isDeveloper(authorId, state) && isMod(state)) {
            timestamps.set(authorId, now);
            setTimeout(() => timestamps.delete(authorId), cooldownAmount);
        }

        await cmd.onTriggered(client, channel, state, message, args);

    } catch (ignore) { return console.log(ignore); }
}

export function isDeveloper(id: String, state: ChatUserstate) {
    if(state.badges.broadcaster) return true;
    return config.devs.includes(`${id}`);
}
export function isMod(id: ChatUserstate) {
    if(id.badges.broadcaster) return true;
    if(config.devs.includes(`${id["user-id"]}`)) return true;
    else return id.mod as boolean;
}
export function isSub(id: ChatUserstate) {
    if(id.badges.broadcaster) return true;
    if(config.devs.includes(`${id["user-id"]}`)) return true;
    if(id.mod) return true;
    return id.subscriber as boolean;
}
export function isFollower(id: ChatUserstate) {
    if(id.badges.broadcaster) return true;
    if(config.devs.includes(`${id["user-id"]}`)) return true;
    if(id.mod) return true;
    if(id.subscriber) return true;
    switch (id.badges.subscriber) {
        case "true":
            return true;
        case "false":
            return false;
        default:
            break;
    }
}

export function isArray(value: any): boolean {
    if (Array.isArray(value) && value.length) return true;
    else return false;
}