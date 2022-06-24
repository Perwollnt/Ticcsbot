import { ChatUserstate, Client } from 'tmi.js';
import { BotCommand, CommandConfig, CommandRequire } from '../utils/interfaces';
import * as set from '../config'
import { HelixApi } from '../api/helixapi';
import { getTimeDiff } from 'time-difference-js';

export class FollowageCommand implements BotCommand {
    config: CommandConfig = {
        name: "followage",
        aliases: ["kovetes", "követés", "követlek", "kovetesinfo"],
        cooldown: 10,
        enabled: true,
        description: "Get the follow time of a user",
    }
    require: CommandRequire = {
        developer: false,
        mod: false,
        sub: false,
        follower: false,
        user: true,
        //dont forget to edit (:
    };

    userApi = new HelixApi("https://api.twitch.tv/helix/", {'Client-ID': set.botconfig.id, 'Authorization': `Bearer ${set.botconfig.token}`}, set.botconfig.channels);

    onTriggered = async (client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) => {
        let usertoCheck = "";
        let self = false;
        if (!args[0]) {
            usertoCheck = state.id;
            self = true;
        }
        else {
            const user = (await this.userApi.getUser(`${args[0].replaceAll("@", "")}`)).data.data;
            usertoCheck = await user[0].id;
            console.log(usertoCheck);
        }
        const resp = await this.userApi.getFollowage(state['user-id'], channel);
        let found = false;
        const temp = {
            username: "",
            followname: "",
            date: "",
        }
        for(let e of resp.data) {
            if(e.from_id == usertoCheck) {
                found = true;
                temp.username = e.from_name;
                temp.followname = e.to_name;
                temp.date = e.followed_at;
                break;
            }
        }
        if(!found) {
            if(self) {
                client.say(channel, set.messages.followage.notfoundself.replaceAll("%u", state.username));
            }
            else {
                client.say(channel, `${set.messages.followage.notfound.replaceAll("%ua", state.username).replaceAll("%username", args[0].replaceAll("@", ""))}`);
            }
        } else {
            const date = temp.date;
            const today = new Date();
            console.log(today);
            console.log(date);
            const c = date.split("T")[1];
            const trudate = {
                year: date.split("-")[0],
                month: date.split("-")[1],
                day: date.split("-")[2].split("T")[0],
                hour: c.split(":")[0],
                minute: c.split(":")[1],
                second: c.split(":")[2].split("Z")[0],
            }
            const dateh = new Date(`${trudate.year}/${trudate.month}/${trudate.day} ${trudate.hour}:${trudate.minute}:${trudate.second}`);
            const elapsed = getTimeDiff(dateh);
            let timestuff = "";
            switch (elapsed.suffix) {
                case 'seconds':
                    timestuff = "seconds";
                    break;
                case 'minutes':
                    timestuff = "minutes";
                    break;
                case 'hours':
                    timestuff = "hours";
                    break;
                case 'days':
                    timestuff = "days";
                    break;
                case 'months':
                    timestuff = "months";
                    break;
                case 'years':
                    timestuff = "years";
                    break;
                default:
                    break;
            }
            if(self) {
                client.say(channel, set.messages.followage.self.replaceAll("%u", state.username).replaceAll("%followname", temp.followname).replaceAll("%date", `${elapsed.time} ${timestuff}`));
            } else {
                client.say(channel, set.messages.followage.other.replaceAll("%ua", state.username).replaceAll("%username", temp.username).replaceAll("%followname", temp.followname).replaceAll("%date", `${elapsed.value} ${timestuff}`));
            }
        }
    }
}