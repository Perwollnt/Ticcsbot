import { BotEvent } from "../utils/interfaces";
import ConnectedEvent from "../events/connected"
import MessageEvent from "../events/message";

export const events: Array<BotEvent> = [
    new ConnectedEvent,
    new MessageEvent
];