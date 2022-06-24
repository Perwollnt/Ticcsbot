import { ChatUserstate, Client } from 'tmi.js';
import { BotCommand, CommandConfig, CommandRequire } from '../utils/interfaces';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import { firestore } from 'firebase-admin';
import { CronManager } from '../stuff/cronManager';
import { EventEmitter } from 'stream';
const cronSettings = require("../../settings.json");

export class AutoMessagerCommand implements BotCommand {

    config: CommandConfig = {
        name: "amsg",
        aliases: ["automessager", "AutoMessager"],
        cooldown: 1,
        enabled: true,
        description: "Manage auto messager stuff",
    }
    require: CommandRequire = {
        developer: false,
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


    cronManager = new CronManager();

    cronnum = 0;
    onTriggered = async (client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) => {
        if(!args[0]) return client.say(channel, `Currently: ${cronSettings.cron.enabled}, and ${this.cronnum} cron jobs are running`);
        if(args[0] == "enable") {
            for(let e of cronSettings.cron.messages) { 
                this.cronManager.run(e.message, e.time, client, channel);
                this.cronnum++;
            }
            cronSettings.cron.enabled = true;
            fs.writeFileSync("settings.json", JSON.stringify(cronSettings));
            return client.say(channel, "Enabled! Loaded " + this.cronnum + " messages.");
        } else if(args[0] == "disable") {
            cronSettings.cron.enabled = false;
            fs.writeFileSync("settings.json", JSON.stringify(cronSettings));
            client.say(channel, "Disabled! Stopped " + this.cronnum + " messages.");
            return this.cronnum = 0;
        }
    }
}