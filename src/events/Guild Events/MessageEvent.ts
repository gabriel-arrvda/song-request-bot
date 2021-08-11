import { Message } from "discord.js"
import { Command } from "../../interfaces/Command"
import { RunFunction } from "../../interfaces/Event"

export const run: RunFunction = async(client, message: Message) => {
    if(message.author.bot || !message.guild || !message.content.toLowerCase().startsWith('wf.')){
      return   
    } 

    const args: string[] = message.content.slice('wf.'.length).trim().split(/ +/g)
    const cmd: string = args[0]
    const alias: any = client.aliases.get(cmd)
    const command: Command | undefined = client.commands.get(cmd) || client.commands.get(alias)

    if(!command) {
      return
    } 

    command.run(client, message, args).catch((reason: any) => {
      message.channel.send(client.embed({description: `Vixe véinho eu tive um erro: ${reason}`}, message))
    })
}

export const name: string = 'message'