import fs from 'fs';
import { REST } from '@discordjs/rest';
import { APIApplicationCommandOption, Routes } from 'discord-api-types/v9';
import { pingCommand } from './commands/ping';

const devServId = '697756823729471498'
const CLIENT_ID = "697756721124212746"
const deployCommands = () => {

    const commands: Array<{
        name: string;
        description: string;
        options: APIApplicationCommandOption[];
    }> = []
    commands.push(pingCommand.toJSON());

    if (!process.env.TOKEN) throw Error("Specify TOKEN") 
    const rest = new REST({ version: '9'}).setToken(process.env.TOKEN);
    (async () => {
        try {
            await rest.put(
                Routes.applicationGuildCommands(CLIENT_ID, devServId),
                { body: commands}
            );
            console.log('successful command upload')
        } catch(error){
            console.error(error);
        }
    })();
}


export { deployCommands };