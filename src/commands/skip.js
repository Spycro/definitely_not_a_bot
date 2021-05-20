module.exports = {
	name: 'skip',
	description: 'Skip the current song',
	async execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('You need to be in a voice channel to use this command');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('No music is being played here');
		serverQueue.connection.dispatcher.end();
	},
};