/* eslint-disable no-unused-vars */

import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js';


const btsMemberCommand = new SlashCommandBuilder().setName('btsMember').setDescription('Show a different member of BTS');

const execute = (interaction: CommandInteraction) => {
	interaction.reply({content: 'A pic', files : ['https://i.imgur.com/DWkp6x7.jpg']});

}

export { btsMemberCommand, execute };
