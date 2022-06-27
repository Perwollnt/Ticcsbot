import { ChatUserstate, Client } from "tmi.js";
import { BotCommand, CommandConfig, CommandRequire } from "../utils/interfaces";
import * as set from "../config";
import { Database } from "../helpers/dbCache";
import { Economy as messages, EconomyItems as items, Jobs as jobs } from "../config";
import { randomBreak } from "../helpers/itemStuff";

export class FarmCommand implements BotCommand {
  config: CommandConfig = {
    name: "farm",
    aliases: ["fa", "farming"],
    cooldown: 30,
    enabled: true,
    description: "Economy farm command!",
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

    const fish = jobs.farm;
    const helps = [items.pickaxe, items.rope, items.shovel, items.fancy_boots];
    let randomCoins = Math.floor(Math.random() * fish.moneyrange[1]) + 1;
    const randomItems = Math.floor(Math.random() * fish.itemrange[1]) + 1;
    const gotItems = [];

    for (let e = 0; e < randomItems; e++) gotItems.push(fish.vegetables[Math.floor(Math.random() * fish.vegetables.length)]);
    const gotItemsCount = gotItems.reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});
    randomCoins =
      randomCoins +
      ((gotItemsCount[fish.vegetablenames.carrot] || 0) * fish.prices.carrot +
        (gotItemsCount[fish.vegetablenames.corn] || 0) * fish.prices.corn +
        (gotItemsCount[fish.vegetablenames.potato] || 0) * fish.prices.potato +
        (gotItemsCount[fish.vegetablenames.tomato] || 0) * fish.prices.tomato +
        (gotItemsCount[fish.vegetablenames.wheat] || 0) * fish.prices.wheat);
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
    client.say(channel, jobs.farm.messages[Math.floor(Math.random() * jobs.farm.messages.length)].replaceAll("%u", state.username).replaceAll("%m", `${randomCoins}`).replaceAll("%a", gotItemsString));
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
