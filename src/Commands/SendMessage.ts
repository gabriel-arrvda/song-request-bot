import { RunFunction } from "../interfaces/Command";
import { Config } from "../interfaces/Config";
import * as File from './../config.json'

export const run: RunFunction = async(client, message) => {
    let config: Config = File
    const content_reduced = message.content.replace(`${config.prefix}${name} `, '')

    const msg = await message.channel.send(client.embed({ description: content_reduced}, message)) 
    await msg
}

export const name: string = 'msg'