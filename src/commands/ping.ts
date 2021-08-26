import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js';
import { Command } from '../command';

const pingCommand = new SlashCommandBuilder().setName('ping').setDescription('Simple ping command');

const execute = (interaction: CommandInteraction): void => {
	interaction.reply('Pong!');
}

const Ping: Command = {
	command: pingCommand,
	execute
}


export default Ping;