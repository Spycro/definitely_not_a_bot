/* eslint-disable no-unused-vars */

module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['pang'],
	execute(msg, args) {
		msg.reply('pong');
		msg.channel.send('pong');
	},
};
