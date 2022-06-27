import { config } from "dotenv";

config();

export const botconfig = {
  prefix: process.env.PREFIX,
  username: process.env.BOTNAME as string,
  token: process.env.TOKEN,
  channels: process.env.CHANNEL,
  devs: process.env.DEVS ? process.env.DEVS : ["perwollnt"],
  id: process.env.ID,
};
export const links = {
  discord: "https://discord.gg/W5zCRdftt4",
};

export const system = {
  newUser: "Új felhasználó! Adatgenerálás... Kérlek várj!",
};

export const messages = {
  cooldown: "%u! Kérlek várj %t másodpercet!", //%t = time | %u = userName
  
  followage: {
    self: "%u! %followname követője vagy ennyi ideje: %date", //%f = followname | %d = date | %u = userName
    other: "%ua! %username %followname követője ennyi ideje: %date", //%f = followname | %d = date | %ua = userName (HAS TO BE UA CUZ IT WOULD REPLACE %USERNAME) | %username = username
    notfound: "%ua! %username nem követi ezt a csatornát!", //%ua = userName | %username = username
    notfoundself: "%u! Nem követed a csatornát!", //%u = userName
  },

  uptime: `%dname! A stream %h órája, %m perce és %s másodperce fut!`, //%dname = displayName //%h = hours | %m = minutes | %s = seconds
  
  Eightball: {
    answers: [
      "100%",
      "Eldöntetett... Igaz!",
      "Minden kétséget kizáróan igen",
      "Igen",
      "Lehet",
      "Hmm.... Lehet.",
      "Valószínűleg",
      "Lehetséges",
      "I-Igen.",
      "Minden jel az igenre mutat... Szóval nem.",
      "Minden jel az igenre mutat",
      "Zavaros a kép próbáld újra",
      "Kérdezd később",
      "Inkább nem mondom el",
      "A szolgáltatás.. khm khm *torokköszörülés* Jelenleg nem elérhető",
      "Koncentrálj jobban",
      "Ne hallgass rám",
      "Nem",
      "A kémeim nem jelentettek még semmit",
      "nem hiszem",
      "no",
    ],
    message: "%u! %answer", //%u = userName | %answer = answer
  },

  Help: {
    message: `%u! Jelenleg ezek a parancsok elérhetőek: %cmds. Kérlek adj meg egy parancsot, hogy több információt tudjak szolgáltatni.`, //%u = userName | %cmds = commands
    messageargs: `%uname! %cmd, %desc. Aliasok: %alias.`, //%uname = userName | %cmd = commandName | %alias = aliases | %desc = description | %en = enabled | %cooldown = cooldown
  },
};

export const automessages = {
  timer: 1, //this is minutes
  msg: [
    "Támogatási lehetőségért látogass el a patreon oldalunkra: https://bit.ly/ssspatreon",
    "Ha esetleg szeretnéd támogatni a csatornát egy kis összeggel ezzel segítve a csatorna fejlődését itt bármikor megteheted. https://streamlabs.com/ts_thomson/tip",
    "Csatlakoznál közösségünk discord szerverére? Tedd meg ma és légy az árnyak társaságának tagja. https://discord.gg/cqbbfVxssW",
    "Ha esetleg valamilyen formában segítenéd a munkánkat akkor, dobj meg egy követéssel, hogy te is tagja lehess az árnyak társaságának.",
  ],
};

export const chatcmds = [
  {
    name: "backseat",
    value:
      'Amennyiben nem vagy tisztában a szó fogalmával itt összefoglalnám: A BackSeat, az a tevékenység amikor az adott témában / játékban spoilerezel, illetve irányítani akarod a streamer cselekvését. Amennyiben én teszem fel a kérdést, hogy mit kéne tenni, örülök a segítségnek, ezen kívül a "belebeszélés" jutalom felhasználás lehet még egy opció!',
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
  },
];

export const EconomyItems = {
  spear: { name: "Spear", cost: 1000, boost: 1.1 },
  sword: { name: "Sword", cost: 1000, boost: 1.2 },
  gun: { name: "Gun", cost: 1000, boost: 1.1 },
  fishing_rod: { name: "Fishing rod", cost: 1000, boost: 1.2 },
  fancy_boots: { name: "Fancy boots", cost: 1000, boost: 1.1 },
  rope: { name: "Rope", cost: 1000, boost: 1.1 },
  shovel: { name: "Shovel", cost: 1000, boost: 1.2 },
  fishing_net: { name: "Fishing net", cost: 1000, boost: 1.2 },
  pickaxe: { name: "Pickaxe", cost: 1000, boost: 1.2 },
  flashlight: { name: "Flashlight", cost: 1000, boost: 1.2 },
};

export const Economy = {
  work: {
    need_arg: `%u! Kérlek adj meg egy argumentumot. Elérhető munkák: mine | fish | explore | hunt`, //%u = userName
    broken_item: `%u! Az eszközöd eltört használat közben! Vegyél másikat a !shop %i parancs használatáva.`, //%u = userName | %i = item
    boost_items: `%u! Volt pár hasznos eszközöd ami segített a munkádban.`, //%u = userName
  },

  gamble: {
    help: "!economy gamble [dice <money> | superdice <number> <money>] | dice: Bet on a dice roll, if the bot rolls higher you lose! | Superdice: Bet money and a nubmer on a dice roll, if you win your winnings will be calculated using: (20 - bet number) * (bet money / 2).",
    wins: {
      user: "%un! You won(%bw < %uw)! You get back your %m coin(s) + %w!", //%u = userName | %m = money | %s = state | %w = wincoins
      bot: "%un! The bot won(%bw > %uw)! You lost %m coin(s)!", //%un = userName | %m = money | %s = state | %uw = UserNumber | %bw = BotNumber
      draw: "%un! It's a draw! (%bw = %uw) You get your coins back(%m)!", //%u = userName | %m = money | %s = state
    },
    no_bet: "%u!Where's The Money Lebowski?", //%u = userName
    no_money: "%u! You don't have enough money (%m)!", //%u = userName | %m = money
    no_correct_bet: "%u! You need to bet a number between 1 and 20!", //%u = userName
    no_enought_args: "%u! You need to bet a number and a number of coins!", //%u = userName
    no_real_args_dice: "%u! You need to specify what do you want to do!", //%u = userName
    no_real_args_money: "%u! You need to specify what do you want to bet!", //%u = userName
  },

  shop: {
    needarg: "%u! You need to specify an item to buy! (%a)", //%u = userName | %a = available items
    no_money: "%u! You don't have enough money to buy a %i! (%m)", //%u = userName | %i = item | %m = money
    bought: "%u! You bought %i for %m coin(s)!", //%u = userName | %i = item | %m = money
  },

  help: {
    message: `%u! Available commands: %wc | %sc | %gc]`, //%u = userName | %wc = work commands | %sc = shop commands | %gc = gamble commands
    commands: {
      work: "!work [mine | fish | explore | hunt | farm]",
      shop: "!shop [<Use command to see available items>]",
      gamble: "!gamble [dice <money> | superdice <number> <money>]",
    },
  },

  defaults: {
    money: 5,
  },

  balance: `%u! You have %m coin(s)!`, //%u = userName | %m = money
};

export const Jobs = {
  mine: {
    moneyrange: [0, 5],
    itemrange: [0, 7],
    breakpercent: 6,
    prices: {
      stone: 1,
      iron: 2,
      gold: 2,
      diamond: 3,
      emerald: 3,
      quartz: 4,
      coal: 1,
    },
    orenames: {
      stone: "stone",
      iron: "iron",
      gold: "gold",
      diamond: "diamond",
      emerald: "emerald",
      quartz: "quartz",
      coal: "coal",
    },
    ores: ["stone", "iron", "gold", "diamond", "emerald", "quartz", "coal"],
    messages: ["You mined %i and got %m gold coins!", "You mined  %i and got %m silver coins!", "You mined  %i and got %m coins!"], //%p = quantity | %i = item | %m = money
    break_messages: ["Your %i broke while mining!", "You broke your %i while mining!", "A bat scared you and you dropped your %i in a hole!"], //%i = item
    helps: ["Fancy boots", "Rope", "Shovel", "Flashlight", "Pickaxe"],
  },

  fish: {
    moneyrange: [1, 4],
    itemrange: [1, 6],
    breakpercent: 6,
    prices: {
      cod: 1,
      salmon: 1,
      pufferfish: 2,
      clownfish: 1,
      dolphin: 1,
      jellyfish: 2,
    },
    fishnames: {
      cod: "cod",
      salmon: "salmon",
      pufferfish: "pufferfish",
      clownfish: "clownfish",
      dolphin: "dolphin",
      jellyfish: "jellyfish",
    },
    fish: ["cod", "salmon", "pufferfish", "clownfish", "dolphin", "jellyfish"],
    nothing: "a random generic fish",
    messages: [
      "You caught  %i and got %m gold coins!",
      "You managed to catch  %i and got %m silver coins!",
      "You caught  %i and got %m coins!",
      "You caught  %i but let it live. Here's %m coins for your deed!",
    ], //%p = quantity | %i = item | %m = money
    break_messages: ["Your %i broke while fishing!", "You broke your %i while fishing!", "A shark scared you and you dropped your %i in the water!"], //%i = item
    helps: ["Fancy boots", "Rope", "Gun", "Fishing rod"],
  },

  explore: {
    moneyrange: [0, 20],
    itemrange: [0, 7],
    breakpercent: 6,
    prices: {
      forest: 1,
      desert: 1,
      mountain: 2,
      plains: 1,
      jungle: 1,
      ocean: 2,
      snow: 1,
      volcano: 2,
      void: 1,
    },
    area: ["forest", "desert", "mountain", "plains", "jungle", "ocean", "snow", "volcano", "void"],
    messages: [
      "You went exploring to the %b biome and found %m gold coins!",
      "You went exploring to the %b biome and found %m silver coins!",
      "You went exploring to the %b biome and found %m coins!",
    ], //%b = area | %m = money
    break_messages: [
      "Your %i broke while exploring!",
      "You broke your %i while exploring!",
      "A bat scared you and you dropped your %i in a hole!",
      "You almost got hit by an elephant and you dropped your %i while running",
    ], //%i = item
    helps: ["Fancy boots", "Rope", "Shovel", "Flashlight", "Pickaxe", "Gun", "Sword"],
  },

  hunt: {
    moneyrange: [0, 20],
    itemrange: [0, 7],
    breakpercent: 6,
    prices: {
      rabbit: 1,
      fox: 1,
      bear: 2,
      pig: 1,
      sheep: 1,
      chicken: 1,
      whale: 2,
      dolphin: 1,
      jellyfish: 2,
    },
    animalsnames: {
      // has to be the same as animals and as long as prices // u cant make it longer YET sadly and please dont try cuz it will break ( u need to edit code to add more animals )
      rabbit: "rabbit",
      fox: "fox",
      bear: "bear",
      pig: "pig",
      sheep: "sheep",
      chicken: "chicken",
      whale: "whale",
      dolphin: "dolphin",
      jellyfish: "jellyfish",
    },
    animals: ["rabbit", "fox", "bear", "pig", "sheep", "chicken", "whale", "dolphin", "jellyfish"],
    messages: ["You went hunting and after finding %a you sold them for %m gold coins!", "You couldn't harm %a because they were so cute. Heres %m coins tho!"], // %a = animal | %m = money
    break_messages: ["You got lost while hunting and your %i broke!", "You got lost and broke your %i!"], //%i = item
    helps: ["Gun", "Sword", "Fancy boots", "Rope", "Shovel", "Flashlight"],
  },

  farm: {
    moneyrange: [0, 4],
    itemrange: [0, 3],
    breakpercent: 6,
    prices: {
      carrot: 1,
      potato: 1,
      tomato: 2,
      corn: 1,
      wheat: 1,
    },
    vegetablenames: {
      carrot: "carrot",
      potato: "potato",
      tomato: "tomato",
      corn: "corn",
      wheat: "wheat",
    },
    vegetables: ["carrot", "potato", "tomato", "corn", "wheat"],
    messages: ["You went farming and managed to grow %a. Its worth %m gold coins!", "You found a vegetarian and you got %a. Heres %m coins for your troubles!"], // %a = animal | %m = money
    break_messages: ["Your %i broke!", "Your %i broke while gardening!"], //%i = item
    helps: ["Gun", "Sword", "Fancy boots", "Rope", "Shovel", "Flashlight"],
  },
};
