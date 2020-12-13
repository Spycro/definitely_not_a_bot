const { MessageEmbed } = require('discord.js');

module.exports = {
	name : 'queue',
	description : 'List the current queue',
	async execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('You need to be in a voice channel to use this command');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('No music is being played here');

		const queueEmbed = new MessageEmbed();

		queueEmbed.setTitle('Queue list');
		let songsList = '';
		let i = 1;
		serverQueue.songs.forEach(song => {
			if (i === 1) {
				songsList += `${i}. ${song.title} **(playing)**\n`;
			}
			else {
				songsList += `${i}. ${song.title}\n`;
			}
			i++;
		});
		queueEmbed.setDescription(songsList);
		return message.channel.send(queueEmbed);
	},
};