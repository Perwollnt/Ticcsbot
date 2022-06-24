import { Client } from 'tmi.js';
import { BotCommand, BotEvent } from '../utils/interfaces';
import { commandList } from './Client';

export class Handlers {
    static command(client: Client, commands: Array<BotCommand>): void {
        commands.forEach(c => {
            commandList.set(c.config.name, c)
            console.log(`${c.config.name} command registered`);
        });
    }
    static event(client: Client, events: Array<BotEvent>): void {
        events.forEach(e => client.on(e.name, e.onTriggered.bind(null, client)));
    }
}