/* eslint-disable no-unused-vars */


module.exports = {
	name: 'join',
	description: 'Join a voice channel',
	aliases: ['j'],
	async execute(msg, args) {
		const voiceChannel = msg.member.voice.channel;
		if(voiceChannel) {
			const connection = await voiceChannel.join();
		}
	},
};

