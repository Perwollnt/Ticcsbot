import { config } from "dotenv"

config();

export const botconfig = {
    prefix: process.env.PREFIX,
    username: "perwollnthazikedvence",
    token: process.env.TOKEN,
    channels: "Perwollnt",
    devs: ["#perwollnt", "perwollnt"],
    id: process.env.ID,
}

export const messages = {
    cooldown: "%u! You need to wait %time seconds before using this command again!", //%t = time | %u = userName
    followage: {
        self: "%u! You are following %followname since %date", //%f = followname | %d = date | %u = userName
        other: "%ua! %username is following %followname since %date", //%f = followname | %d = date | %ua = userName (HAS TO BE UA CUZ IT WOULD REPLACE %USERNAME) | %username = username
        notfound: "%ua! %username is not following the channel", //%ua = userName | %username = username
        notfoundself: "%u! You are not following the channel", //%u = userName
    },
    uptime: `%dname!The stream has been online for %h hours, %m minutes and %s seconds!`, //%dname = displayName //%h = hours | %m = minutes | %s = seconds
    Eightball: {
        answers: ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"],
        message : "%u! %answer", //%u = userName | %answer = answer
    },
    Help: {
        message: `%u! I have the following commands: %cmds. Please specify a command to get more information about it.`, //%u = userName | %cmds = commands
        messageargs: `%uname! %cmd, %desc. Aliases: %alias.`, //%uname = userName | %cmd = commandName | %alias = aliases | %desc = description | %en = enabled | %cooldown = cooldown
    }
}