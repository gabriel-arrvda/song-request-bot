import { RunFunction } from "../interfaces/Command";
import { Config } from "../interfaces/Config";
import * as File from './../config.json'

export const run: RunFunction = async(client, message) => {
    let config: Config = File
    let content_reduced = await message.content.replace(`${config.prefix}${name} `, '')

    for (const alias of aliases) {
        content_reduced = content_reduced.replace(`${config.prefix}${alias} `, '')
    }

    const msg = await message.channel.send(client.embed({ description: content_reduced}, message)) 
    await msg
}

export const name: string = 'msg'
export const aliases: string[] = ['msg','message']