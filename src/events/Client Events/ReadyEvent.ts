import { RunFunction } from "../../interfaces/Event";

export const run: RunFunction = async(client) => {
    console.log(`${client.user?.tag} ficou online`)
}

export const name: string = 'ready'