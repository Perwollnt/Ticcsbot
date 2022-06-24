import * as cron from "cron";
import { EventEmitter } from 'stream';
import { Client } from 'tmi.js';
import { AutoMessagerCommand } from "../commands/AutoMessager";
const cronSettings = require("../../settings.json");

export class CronManager{
    async run(msg: string, time: string, client: Client, channel: string) {
        const cronJob = new cron.CronJob(time, async () => {
            if(cronSettings.cron.enabled) client.say(channel, msg);
        });
        cronJob.start();
    }
}