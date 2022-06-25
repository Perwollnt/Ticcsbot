export interface ItemInterface { 
    pickaxe: {
        name: string,
        cost: number,
    }
    flashlight: {
        name: string,
        cost: number,
    }
    fishing_rod: {
        name: string,
        cost: number,
    }
    fancy_boots: {
        name: string,
        cost: number,
    }
    rope: {
        name: string,
        cost: number,
    }
    shovel: {
        name: string,
        cost: number,
    }
    fishing_net: {
        name: string,
        cost: number,
    }
    spear: {
        name: string,
        cost: number,
    }
    sword: {
        name: string,
        cost: number,
    }
    gun: {
        name: string,
        cost: number,
    }
}

export interface JobInterface {
    mine: {
        moneyrange: [number, number],
        itemrange: [number, number],
        ores: string[],
        messages: string[],
        break_messages: string[],
        helps: string[];
    }
    fish: {
        moneyrange: [number, number],
        itemrange: [number, number],
        fish: string[],
        messages: string[],
        break_messages: string[],
        helps: string[];
    }
    explore: {
        moneyrange: [number, number],
        itemrange: [number, number],
        area: string[],
        messages: string[],
        break_messages: string[],
        helps: string[];
    }
    hunt: {
        moneyrange: [number, number],
        itemrange: [number, number],
        animals: string[],
        messages: string[],
        break_messages: string[],
        helps: string[];
    }
}