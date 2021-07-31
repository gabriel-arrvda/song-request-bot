import { Client, MessageEmbedOptions, Message, Intents, Collection, MessageEmbed } from 'discord.js';
import { promisify } from 'util';
import { Command } from '../interfaces/Command';
import { Config } from '../interfaces/Config';
import { Event } from '../interfaces/Event';
import glob from 'glob';

const globPromise = promisify(glob)

export class Bot extends Client {

    public commands: Collection<string, Command> = new Collection()
    public events: Collection<string, Event> = new Collection()
    public config: Partial<Config> = {}

    public console: Console | undefined

    public constructor(){
        super({
            ws: {
                intents: Intents.ALL
            },
            messageCacheLifetime: 180,
            messageCacheMaxSize: 200,
            messageEditHistoryMaxSize: 200,
            messageSweepInterval: 180, 
        });
    }

    public async start(config: Config){
        this.config = config
        this.login(config.token)

        const commandFiles: string[] = await globPromise(`${__dirname}/../commands/*{.ts,.js}`)
        console.log(commandFiles)
        commandFiles.map( async (value: string) => {
            const file: Command = await import(value)
            this.commands.set(file.name, file)
        })

        const eventFiles: string[] = await globPromise(`${__dirname}/../events/**/*{.ts,.js}`)
        console.log(eventFiles)
        eventFiles.map( async (value: string) => {
            const file: Event = await import(value)
            this.events.set(file.name, file)
            this.on(file.name, file.run.bind(null, this))
        })
    }

    public embed(options: MessageEmbedOptions, message: Message): MessageEmbed {
        return new MessageEmbed({
            ...options, 
            color: '#750111'
        }).setFooter(`${message.author.tag} | ${this.user?.username}`, message.author.displayAvatarURL({
            format: 'png',
            dynamic: true
        }))
    }
}