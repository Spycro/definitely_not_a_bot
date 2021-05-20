module.exports = {
	name: 'np',
	description: 'Show the currently playing song',
	async execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('You need to be in a voice channel to use this command');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('No music is being played here');

		let strSongInfo = 'Currently playing : ';
		strSongInfo += serverQueue.songs[0].title;
		if(serverQueue.looping) {
			strSongInfo += '\n**Looping: True**';
		}

		return message.channel.send(strSongInfo);
	},
};