module.exports = {
	name: 'loop',
	description: 'Make the current song play on a loop or cancel it',
	async execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('There is nothing playing that I could loop for you.');

		serverQueue.looping = !serverQueue.looping;

		if(serverQueue.looping) {
			return message.channel.send('Looping : **enabled**');
		}
		else{
			return message.channel.send('Looping : **disabled**');
		}
	},
};