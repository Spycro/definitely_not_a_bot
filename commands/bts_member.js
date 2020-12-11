/* eslint-disable no-unused-vars */

module.exports = {
	name: 'member',
	description: 'Show a different member of BTS',
	aliases: ['mb'],
	execute(msg, args) {
		msg.reply('pong');


		msg.channel.send('A pic', { files : ['https://i.imgur.com/DWkp6x7.jpg'] })
			.then(console.log('image sent')
				.catch(console.error('There was an error')));
	},
};
