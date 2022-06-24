import { ChatUserstate, Client } from 'tmi.js';
import { HelixApi } from '../api/helixapi';
import { BotCommand, CommandConfig, CommandRequire } from '../utils/interfaces';
import * as set from '../config';
import DateDiff from 'date-diff';

export class UptimeCommand implements BotCommand {
    config: CommandConfig = {
        name: "uptime",
        aliases: ["futas", "megyastream"],
        cooldown: 1,
        enabled: true,
    }
    require: CommandRequire = {
        developer: false,
        mod: false,
        sub: false,
        follower: false,
        user: false,
    };
    apiManager = new HelixApi("https://api.twitch.tv/helix/", {'Client-ID': set.botconfig.id, 'Authorization': `Bearer ${set.botconfig.token}`}, set.botconfig.channels);

    onTriggered = async (client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) => {
        const streamerid = (await this.apiManager.getUser(`${channel.replaceAll("#", "")}`)).data.data[0].id;
        const resp = (await this.apiManager.getStreamTime(streamerid)).data;
        const diff = new DateDiff(new Date(), new Date(resp.data[0].started_at));
        var datea = new Date(null);
        datea.setSeconds(diff.seconds());
        var timeString = datea.toISOString().substr(11, 8);
        const converted = [timeString.split(":")[0].replaceAll("00", "0"), timeString.split(":")[1].replaceAll("00", "0"), timeString.split(":")[2].replaceAll("00", "0")];
        client.say(channel, `${set.messages.uptime.replaceAll("%dname", state['display-name']).replaceAll("%h", converted[0]).replaceAll("%m", converted[1]).replaceAll("%s", converted[2])}`);
    }
    
}