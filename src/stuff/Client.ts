import Collection from "@discordjs/collection";
import { botconfig } from "../config";
import { BotCommand } from "../utils/interfaces";
import { Client } from 'tmi.js';
import { Handlers } from "./handlers";
import { commands } from '../defs/commands';
import { events } from '../defs/events';

export const client = new Client({
	options: { debug: true },
    connection: { reconnect: true, secure: true },
	identity: {
		username: botconfig.username,
		password: `oauth:${botconfig.token}`
	},
	channels: [`${botconfig.channels}`]
});

export const commandList = new Collection<String, BotCommand>();

Handlers.event(client, events);
Handlers.command(client, commands);