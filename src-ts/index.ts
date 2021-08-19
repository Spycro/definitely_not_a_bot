require('dotenv').config();
import Discord, { Intents } from 'discord.js';
import NotAClient from './Client';
import fs from 'fs';

const client = new NotAClient({intents: [Intents.FLAGS.GUILDS]});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

const AUTHORIZED_SERVER = ['593869491029409815', '697756823729471498'];

client.prefix = process.env.PREFIX || '!';
console.info(client.prefix);


client.once('ready', () => {
	console.info(`Logged in as ${client.user!.tag}!`);
});



client.on('message', async (message) => {
	if (!message.content.startsWith(client.prefix) || message.author.bot || !AUTHORIZED_SERVER.includes(message.guild!.id)) return;

	const args = message.content.slice(client.prefix.length).split(/ +/);
	if(!args) throw Error()
	const commandName = args.shift();
	// message like : '!'
	if(!commandName) { return ; }

	const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));


	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'GUILD_TEXT') {
		message.reply('I can\'t execute that command inside DMs!');
		return;
	}
	console.info(`Called command: ${commandName}`);

	// if (command.args && !args.length) {
	// 	let reply = `You didn't provide any arguments, ${message.author}!`;

	// 	if (command.usage) {
	// 		reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
	// 	}

	// 	return message.channel.send(reply);
	// }


	// if (!cooldowns.has(command.name)) {
	// 	cooldowns.set(command.name, new Discord.Collection());
	// }

	// const now = Date.now();
	// const timestamps = cooldowns.get(command.name);
	// const cooldownAmount = (command.cooldown || 3) * 1000;

	// if (timestamps.has(message.author.id)) {
	// 	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	// 	if (now < expirationTime) {
	// 		const timeLeft = (expirationTime - now) / 1000;
	// 		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
	// 	}
	// }

	// timestamps.set(message.author.id, now);
	// setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


	// try {
	// 	await command.execute(message, args);
	// }
	// catch (error) {
	// 	console.error(error);
	// 	message.reply('there was an error trying to execute that command!');
	// }
});

client.login(process.env.TOKEN);
