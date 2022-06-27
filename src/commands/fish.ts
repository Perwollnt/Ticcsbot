import { ChatUserstate, Client } from "tmi.js";
import { BotCommand, CommandConfig, CommandRequire } from "../utils/interfaces";
import * as set from "../config";
import { Database } from "../helpers/dbCache";
import { Economy as messages, EconomyItems as items, Jobs as jobs } from "../config";
import { randomBreak } from "../helpers/itemStuff";

export class FishCommand implements BotCommand {
  config: CommandConfig = {
    name: "fish",
    aliases: ["fs", "fishing"],
    cooldown: 30,
    enabled: true,
    description: "Economy fish command!",
  };
  require: CommandRequire = {
    developer: false,
    mod: false,
    sub: false,
    follower: false,
    user: false,
  };

  db = new Database();
  hasItems: string[] = [];
  user: any;
  onTriggered = async (client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) => {
    this.user = await this.db.get("TiccsBot/Economy/Users/" + state["user-id"]);
    if (!this.user) {
        client.say(channel, `${set.system.newUser}`);
        this.user = {
        money: messages.defaults.money,
        username: state.username,
        userid: state["user-id"],
        spear: false,
        sword: false,
        gun: false,
        fishing_rod: false,
        fancy_boots: false,
        rope: false,
        shovel: false,
        fishing_net: false,
        pickaxe: false,
        flashlight: false,
        };
        this.user = await this.db.set("TiccsBot/Economy/Users/" + state["user-id"], this.user);
    }
    for (let item in items) {
        if (this.user[item]) {
        this.hasItems.push(item);
        }
    }
    const fish = jobs.fish;
    const helps = [items.fishing_net, items.rope, items.fishing_rod, items.gun, items.spear];
    let randomCoins = Math.floor(Math.random() * fish.moneyrange[1]) + 1;
    const randomItems = Math.floor(Math.random() * fish.itemrange[1]) + 1;
    const gotItems = [];
    for (let e = 0; e < randomItems; e++) gotItems.push(fish.fish[Math.floor(Math.random() * fish.fish.length)]);
    const gotItemsCount = gotItems.reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});
    randomCoins =
      randomCoins +
      ((gotItemsCount[fish.fishnames.cod] || 0) * fish.prices.cod +
        (gotItemsCount[fish.fishnames.clownfish] || 0) * fish.prices.clownfish +
        (gotItemsCount[fish.fishnames.dolphin] || 0) * fish.prices.dolphin +
        (gotItemsCount[fish.fishnames.jellyfish] || 0) * fish.prices.jellyfish +
        (gotItemsCount[fish.fishnames.pufferfish] || 0) * fish.prices.pufferfish +
        (gotItemsCount[fish.fishnames.salmon] || 0) * fish.prices.salmon);
    let gotItemsString = Object.keys(gotItemsCount)
      .map((key) => `${gotItemsCount[key]}x ${key}`)
      .join(", ");
    const path = "TiccsBot/Economy/Users/" + state["user-id"];
    const doc = await this.db.get(path);
    let hadItems = false;
    for (let e of this.hasItems) {
      for (let a of helps) {
        if (e == a.name) {
          hadItems = true;
          randomCoins = randomCoins * a.boost;
        }
      }
    }
    if (hadItems) {
      client.say(channel, messages.work.boost_items.replace("%u", state.username));
    }
    randomCoins = parseInt(randomCoins.toFixed(0)) as number;
    if (gotItemsString.length < 1) gotItemsString = fish.nothing;
    client.say(channel, jobs.fish.messages[Math.floor(Math.random() * jobs.fish.messages.length)].replace("%u", state.username).replace("%m", `${randomCoins}`).replace("%i", gotItemsString));
    randomCoins = parseInt(doc.money + randomCoins);
    this.db.set(path, { money: randomCoins });
    const c = await randomBreak(this.hasItems, fish.breakpercent || 6);
    if(!c) return;
    if (c.length > 1) {
      client.say(channel, messages.work.broken_item.replace("%u", state.username).replace("%i", `${c}`));
      this.removeItem(state, `${c}`);
    }
  };
  async removeItem(state: ChatUserstate, name: string) {
    this.user = this.db.set(`TiccsBot/Economy/Users/${state["user-id"]}`, { [name]: false });
    this.hasItems = [];
  }
}
