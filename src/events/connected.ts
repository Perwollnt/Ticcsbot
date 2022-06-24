import { BotEvent } from "../utils/interfaces";
import { Client, Events } from 'tmi.js';
import { CronManager } from "../stuff/cronManager";
//import { ClientLogger } from '../utils/loggers';

export default class ConnectedEvent implements BotEvent {
    name: keyof Events = "connected";
    cronManager = new CronManager();
    onTriggered = async() => {
        console.log("Connected!");
    }
}