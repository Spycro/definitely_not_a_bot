/* eslint-disable no-unused-vars */

import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js';
import { Command } from '../command';


const btsMemberCommand = new SlashCommandBuilder().setName('btsmember').setDescription('Show a different member of BTS');

const execute = (interaction: CommandInteraction) => {
	interaction.reply({content: 'A pic', files : ['https://i.imgur.com/DWkp6x7.jpg']});

}

const btsMember: Command = {
	command: btsMemberCommand,
	execute
}

export default btsMember;
