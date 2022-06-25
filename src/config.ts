import { config } from "dotenv"

config();

export const botconfig = {
    prefix: process.env.PREFIX,
    username: process.env.BOTNAME as string,
    token: process.env.TOKEN,
    channels: process.env.CHANNEL,
    devs: process.env.DEVS ? process.env.DEVS : ["perwollnt"],
    id: process.env.ID,
}
export const links = {
    discord: "https://discord.gg/W5zCRdftt4",
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
    },
    Discord: {
        message: "%u! Csatlakozz a discord csatornánkhoz: %dc" //%u = userName | %dc = discord
    },
    schedule: {
        message: "%u! %schedule", //%u = userName | %schedule = schedule
    }
}

export const automessages = {
    timer: 1,
    msg: [
        "Támogatási lehetőségért látogass el a patreon oldalunkra: https://bit.ly/ssspatreon",
        "Ha esetleg szeretnéd támogatni a csatornát egy kis összeggel ezzel segítve a csatorna fejlődését itt bármikor megteheted. https://streamlabs.com/ts_thomson/tip",
        "Csatlakoznál közösségünk discord szerverére? Tedd meg ma és légy az árnyak társaságának tagja. https://discord.gg/cqbbfVxssW",
        "Ha esetleg valamilyen formában segítenéd a munkánkat akkor, dobj meg egy követéssel, hogy te is tagja lehess az árnyak társaságának.",
    
    ]
}

export const chatcmds = [
    {
        name: "backseat",
        value: "Amennyiben nem vagy tisztában a szó fogalmával itt összefoglalnám: A BackSeat, az a tevékenység amikor az adott témában / játékban spoilerezel, illetve irányítani akarod a streamer cselekvését. Amennyiben én teszem fel a kérdést, hogy mit kéne tenni, örülök a segítségnek, ezen kívül a \"belebeszélés\" jutalom felhasználás lehet még egy opció!",
    },
    {
        name: "discord",
        value: "Csatlakozz a discord közösségünkhöz: " + links.discord,
    },
    {
        name: "hc",
        value: "Egy minecraft hardcore sorozatban veszel részt amibel cél, hogy kimaxoljuk mindazt amit lehet.",
    },
    {
        name: "menetrend",
        value: "Itt láthatjátok a csatorna menetrendjét: Hétfő: 16:00 - 19:00 Kedd: 16:00 - 18:00 Szerda: NINCS Csütörtök: 15:00 - 17:00 Péntek: NINCS Szombat: NINCS Vasárnap: 19:00 - 21:00",
    },
    {
        name: "nevesdki",
        value: "Ennek a parancsnak a futtatója felhatalmazott, hogy kinevesselek...hahahaha -remélem nem voltam gonosz.",
    },
    {
        name: "sr",
        value: "Magyarország egyik legegyedibb SkyPvP - SkyMob illetve FullPvP szervere! Látogass el Discord csatornánkra: https://skyreflect.hu/dc IP: play.skyreflect.hu",
    },
    {
        name: "yt",
        value: "Ha szeretnéd visszatekinteni az adásokat katt ide: https://www.youtube.com/channel/UCDGLH-GqIGSOC2J-DsaBh7A",
    }
]