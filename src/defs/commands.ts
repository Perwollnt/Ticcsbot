import { TestCommand } from '../commands/test';
import { FollowageCommand } from '../commands/followage';
import { BotCommand } from '../utils/interfaces';
import { UptimeCommand } from '../commands/uptime';
import { EightBallCommand } from '../commands/8ball';
import { HelpCommand } from '../commands/help';
import { AutoMessagerCommand } from '../commands/AutoMessager';
import { EconomyCommand } from '../commands/economy';
import { ExploreCommand } from '../commands/explore';
import { FishCommand } from '../commands/fish';
import { ShopCommand } from '../commands/shop';
import { HuntCommand } from '../commands/hunt';
import { MineCommand } from '../commands/mine';
import { GambleCommand } from '../commands/gamble';
import { FarmCommand } from '../commands/farm';
import { FlipCommand } from '../commands/coinFlip';
import { RouletteCommand } from '../commands/roulette';
import { SettingsCommand } from '../commands/settings';

export const commands: Array<BotCommand> = [
    new TestCommand,
    new FollowageCommand,
    new UptimeCommand,
    new EightBallCommand,
    new HelpCommand,
    new AutoMessagerCommand,
    new EconomyCommand,
    new ExploreCommand,
    new FishCommand,
    new ShopCommand,
    new HuntCommand,
    new MineCommand,
    new GambleCommand,
    new FarmCommand,
    new FlipCommand,
    new RouletteCommand,
    new SettingsCommand,
];