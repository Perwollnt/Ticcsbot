import { BotEvent } from "../utils/interfaces";
import { Events } from 'tmi.js';
//import { ClientLogger } from '../utils/loggers';

export default class ConnectedEvent implements BotEvent {
    name: keyof Events = "connected";

    onTriggered = async() => console.log("Connected!");
}