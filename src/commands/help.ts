import { ChatUserstate, Client } from 'tmi.js';

import * as set from '../config';
import { commandList, commandList as commands } from '../stuff/Client';
import { BotCommand, CommandConfig, CommandRequire } from '../utils/interfaces';


export class HelpCommand implements BotCommand {
  config: CommandConfig = {
    name: "help",
    aliases: ["helpcommand", "segitseg"],
    cooldown: 1,
    enabled: true,
    description: "help command",
  };
  require: CommandRequire = {
    developer: false,
    mod: false,
    sub: false,
    follower: false,
    user: false,
  };
  onTriggered = async ( client: Client, channel: string, state: ChatUserstate, message: String, args: Array<String> ) => {
    if (args.length === 0) {
      const commands: String[] = [];
      for (let e of commandList) {
        if (e[1].require.developer || e[1].require.mod) {
        } else {
          commands.push(e[0]);
        }
      }
      client.say(channel, set.messages.Help.message.replaceAll("%u", state.username).replaceAll("%cmds", commands.join(", ")));
    } else {
      for (let e of commandList) {
        if (e[1].config.name.match(`${args[0]}`)) {
          client.say(channel, set.messages.Help.messageargs.replaceAll("%uname", state.username).replaceAll("%cmd", `${e[1].config.name}`).replaceAll("%desc", `${e[1].config.description}`).replaceAll("%alias", e[1].config.aliases.join(", ")).replaceAll("%cooldown", e[1].config.cooldown.toString()).replaceAll("%en", e[1].config.enabled.toString()));
        }

      }
    }
  }
};
