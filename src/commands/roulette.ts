import { ChatUserstate, Client } from "tmi.js";
import { BotCommand, CommandConfig, CommandRequire } from "../utils/interfaces";
import * as set from "../config";
import { Database } from "../helpers/dbCache";

export class RouletteCommand implements BotCommand {
  config: CommandConfig = {
    name: "roulette",
    aliases: ["rl", "rlCommand"],
    cooldown: 1,
    enabled: true,
    description: "Roulette command",
  };
  require: CommandRequire = {
    developer: false,
    mod: true,
    sub: false,
    follower: false,
    user: false,
  };

  db = new Database();

  onTriggered = async (client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String>) => {
    const cmd = set.commands.roulette;
    let bet = parseInt(`${args[0]}`);
    const color = args[1];
    if (!bet) return client.say(channel, cmd.nobet.replace("%u", state.username));
    if (!color) return client.say(channel, cmd.nocolor.replace("%u", state.username).replaceAll("%b", cmd.colors.black).replaceAll("%r", cmd.colors.red).replaceAll("%g", cmd.colors.green));
    const user = await this.db.get(`TiccsBot/Economy/Users/${state["user-id"]}`);
    if (bet > user.money) return client.say(channel, cmd.nomoney.replace("%u", state.username).replaceAll("%m", user.money));
    client.say(channel, cmd.spinMessage.replace("%u", state.username));
    let number = Math.floor(Math.random() * 36);
    let wincolor = "";
    if ((number >= 1 && number <= 10) || number >= 19 || number <= 28) {
      if ((await this.iseven(number)) == true) {
        wincolor = cmd.colors.black;
      } else {
        wincolor = cmd.colors.red;
      }
    } else if ((number >= 11 && number <= 18) || (number >= 29 && number <= 36)) {
      if ((await this.iseven(number)) == true) {
        wincolor = cmd.colors.red;
      } else {
        wincolor = cmd.colors.black;
      }
    } else if (number === 0) {
      wincolor = cmd.colors.green;
    }
    if (color !== wincolor) {
      this.removeMoney(state, `${bet}`);
      return client.say(channel, cmd.lost.replace("%u", state.username).replaceAll("%m", `${bet}`).replaceAll("%c", `${color}`).replaceAll("%w", wincolor));
    }
    if (wincolor == cmd.colors.green) {
      bet = bet * 5;
      this.addMoney(state, `${bet}`);
      return client.say(channel, cmd.won.replace("%u", state.username).replaceAll("%m", `${bet}`).replaceAll("%c", `${wincolor}`));
    } else {
      bet = bet * 2;
      this.addMoney(state, `${bet}`);
      return client.say(channel, cmd.won.replace("%u", state.username).replaceAll("%m", `${bet}`).replaceAll("%c", `${wincolor}`));
    }
  };
  async iseven(number: number) {
    if (number % 2 == 0) {
      return true;
    }
    return false;
  }
  async removeMoney(state: ChatUserstate, money: string) {
    let doc = await this.db.get(`TiccsBot/Economy/Users/${state["user-id"]}`);

    const newmoney = parseInt(`${money}`);
    const dcmoney = doc.money;
    this.db.set(`TiccsBot/Economy/Users/${state["user-id"]}`, { money: dcmoney - newmoney });
  }

  async addMoney(state: ChatUserstate, money: string) {
    let doc = await this.db.get("TiccsBot/Economy/Users/" + state["user-id"]);
    const newmoney = parseInt(`${money}`);
    const dcmoney = doc.money;
    this.db.set("TiccsBot/Economy/Users/" + state["user-id"], { money: dcmoney + newmoney });
  }
}
