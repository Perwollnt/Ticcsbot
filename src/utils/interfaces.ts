import { Events } from 'tmi.js';


export interface BotEvent {
    name: keyof Events;
    onTriggered(...any: any): Promise<any>;
}
export interface BotCommand {
    config: CommandConfig;
    require: CommandRequire;
    onTriggered(...any: any): Promise<any>;
}

export interface CommandConfig {
    name: String;
    aliases: Array<String>;
    cooldown: number;
    enabled: boolean;
    description: String;
}
export interface CommandRequire {
    developer: boolean;
    mod: boolean;
    sub: boolean;
    follower: boolean;
    user: boolean;
}