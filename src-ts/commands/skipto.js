module.exports = {
	name: 'skipto',
	alias: 'st',
	description: 'skip to this song in the queue',
	async execute(message, args) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('You need to be in a voice channel to use this command');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('No music is being played here');
		if (!args) return message.channel.send('Ples specify the number of the song you want to skip to');
		const nb = parseInt(args[0]);
		if(!nb) return message.channel.send('Please specify a number.');
		if(nb <= 1) return message.channel.send('Please specify a number greater than 1.');
		for(let i = 0; i < (nb - 2); i++) {
			serverQueue.songs.shift();
		}
		serverQueue.connection.dispatcher.end();
	},
};