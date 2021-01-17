const ytdl = require('ytdl-core');

function test(abc) {
	console.log(abc);
}

const playMusic = async (song, message) => {
	const serverQueue = message.client.queue.get(message.guild.id);

	const { channel } = message.member.voice;
	if (serverQueue) {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}

	const queueConstruct = {
		textChannel: message.channel,
		voiceChannel: channel,
		connection: null,
		songs: [],
		volume: 2,
		playing: true,
		looping: false,
	};
	message.client.queue.set(message.guild.id, queueConstruct);
	queueConstruct.songs.push(song);

	const play = async (song) => {
		const queue = message.client.queue.get(message.guild.id);
		if (!song) {
			queue.voiceChannel.leave();
			message.client.queue.delete(message.guild.id);
			return;
		}

		const dispatcher = queue.connection.play(ytdl(song.url))
			.on('finish', () => {
				if(!queue.looping) {
					queue.songs.shift();
					play(queue.songs[0]);
				}
				else{
					play(queue.songs[0]);
				}
			})
			.on('error', error => console.error(error));
		dispatcher.setVolumeLogarithmic(queue.volume / 5);
		queue.textChannel.send(`🎶 Start playing: **${song.title}**`);
	};

	try {
		const connection = await channel.join();
		queueConstruct.connection = connection;
		queueConstruct.connection.on('disconnect', (event) => {
			console.log(event);
			console.log('Bot got diconnected');
			message.client.queue.delete(message.guild.ig);
		});
		play(queueConstruct.songs[0]);
	}
	catch (error) {
		console.error(`I could not join the voice channel: ${error}`);
		message.client.queue.delete(message.guild.id);
		await channel.leave();
		return message.channel.send(`I could not join the voice channel: ${error}`);
	}
};

module.exports = { name: 'test', test, playMusic };