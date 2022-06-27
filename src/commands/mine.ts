import { ChatUserstate, Client } from "tmi.js";
import { BotCommand, CommandConfig, CommandRequire } from "../utils/interfaces";
import * as set from "../config";
import { Database } from "../helpers/dbCache";
import { Economy as messages, EconomyItems as items, Jobs as jobs } from "../config";
import { randomBreak } from "../helpers/itemStuff";

export class MineCommand implements BotCommand {
  config: CommandConfig = {
    name: "mine",
    aliases: ["mi", "minecommand"],
    cooldown: 30,
    enabled: true,
    description: "Economy mine command!",
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
    
    const mine = jobs.mine;
    const helps = [items.fancy_boots, items.rope, items.shovel, items.flashlight, items.pickaxe];
    let randomCoins = Math.floor(Math.random() * mine.moneyrange[1]) + 1;
    const randomItems = Math.floor(Math.random() * mine.itemrange[1]) + 1;
    const gotItems = [];
    for (let e = 0; e < randomItems; e++) gotItems.push(mine.ores[Math.floor(Math.random() * mine.ores.length)]);
    const gotItemsCount = gotItems.reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});
    console.log(gotItemsCount.stone);
    randomCoins =
      randomCoins +
      ((gotItemsCount[mine.orenames.stone] || 0) * mine.prices.stone +
        (gotItemsCount[mine.orenames.iron] || 0) * mine.prices.iron +
        (gotItemsCount[mine.orenames.gold] || 0) * mine.prices.gold +
        (gotItemsCount[mine.orenames.diamond] || 0) * mine.prices.diamond +
        (gotItemsCount[mine.orenames.emerald] || 0) * mine.prices.emerald +
        (gotItemsCount[mine.orenames.quartz] || 0) * mine.prices.quartz +
        (gotItemsCount[mine.orenames.coal] || 0) * mine.prices.coal);
    const gotItemsString = Object.keys(gotItemsCount)
      .map((key) => `${gotItemsCount[key]}x ${key}`)
      .join(", ");
    client.say(channel, jobs.mine.messages[Math.floor(Math.random() * jobs.mine.messages.length)].replace("%u", state.username).replace("%m", `${randomCoins}`).replace("%i", gotItemsString));
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
    const path = "TiccsBot/Economy/Users/" + state["user-id"];
    const doc = await this.db.get(path);
    randomCoins = parseInt(doc.money + randomCoins);
    this.db.set(path, { money: randomCoins });
    const c = await randomBreak(this.hasItems, mine.breakpercent || 6);
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
