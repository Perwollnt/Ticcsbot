import { TestCommand } from '../commands/test';
import { FollowageCommand } from '../commands/followage';
import { BotCommand } from '../utils/interfaces';
import { UptimeCommand } from '../commands/uptime';
import { EightBallCommand } from '../commands/8ball';
import { HelpCommand } from '../commands/help';
import { AutoMessagerCommand } from '../commands/AutoMessager';
/*import { EconomyCommand } from '../commands/economy';*/
import { RealEconomyCommand } from '../commands/realEconomy';

export const commands: Array<BotCommand> = [
    new TestCommand,
    new FollowageCommand,
    new UptimeCommand,
    new EightBallCommand,
    new HelpCommand,
    new AutoMessagerCommand,
    /*new EconomyCommand,*/
    new RealEconomyCommand,
];