import { ChatUserstate, Client } from 'tmi.js';
import { BotCommand, CommandConfig, CommandRequire } from '../utils/interfaces';
import * as fs from 'fs';
import { CronManager } from '../stuff/cronManager';
const cronSettings = require("../../settings.json");
import * as set from '../config';

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
    amsgcounter = 0;

    cronManager = new CronManager();

    cronnum = 0;
    onTriggered = async (client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) => {
        if(!args[0]) return client.say(channel, `Currently: ${cronSettings.cron.enabled}, and ${this.cronnum} cron jobs are running`);
        if(args[0] == "enable") {
            cronSettings.cron.enabled = true;
            client.say(channel, "Auto messager enabled");
            fs.writeFileSync("settings.json", JSON.stringify(cronSettings));
            setInterval(() => {
                this.sendMessage(client);
            }, (set.automessages.timer * 60 * 60 * 60));
        } else if(args[0] == "disable") {
            cronSettings.cron.enabled = false;
            client.say(channel, "Auto messager disabled");
            fs.writeFileSync("settings.json", JSON.stringify(cronSettings));
            return this.cronnum = 0;
        }
    }
    numup() {
        this.amsgcounter++;
        console.log(`msgcount: ${this.amsgcounter}`);
    }

    async sendMessage(client: Client) {
        if(!cronSettings.cron.enabled) return;
        if(this.amsgcounter < 3) return console.log(`tried sending message but too few messages have been sent ${this.amsgcounter}`);
        const msg = set.automessages.msg[Math.floor(Math.random() * set.automessages.msg.length)];
        client.say(set.botconfig.channels, msg);
        this.amsgcounter = 0;
    }
}
