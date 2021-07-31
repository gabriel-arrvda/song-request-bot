import { Message } from 'discord.js';
import { Bot } from '../client/Client'

export interface RunFunction {
    (client: Bot, message: Message, args: string[]): Promise<void>
}

export interface Command {
    name: string,
    run: RunFunction,
}