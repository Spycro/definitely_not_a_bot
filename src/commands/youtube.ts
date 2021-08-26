import { SlashCommandBuilder } from '@discordjs/builders';
import { joinVoiceChannel } from '@discordjs/voice';
import { CommandInteraction, GuildMember, Util } from 'discord.js';
import ytdl from 'ytdl-core';
import NotAClient from '../Client';
import { Command } from '../command';

const ytCommand = new SlashCommandBuilder().setName('yt').setDescription('add video to queue');

const execute = async (interaction: CommandInteraction) => {
    if(!interaction.inGuild()){return;}
    const client = interaction.client as NotAClient;
    const vChannel = (interaction.member as GuildMember).voice.channel;
    if(!vChannel){
        return interaction.reply('You should be in a voice channel');
    }
    if(!vChannel.joinable) {
        return interaction.reply('Channel should be joinable by me');
    }

    joinVoiceChannel({
        channelId: vChannel.id,
        guildId: vChannel.guildId,
        adapterCreator: vChannel.guild.voiceAdapterCreator
    })

    const serverQueue = client.queue.get(interaction.guildId);
    const songInfo = await ytdl.getInfo('aUrl');
    const song = {
        id: songInfo.videoDetails.videoId,
        title: Util.escapeMarkdown(songInfo.videoDetails.title),
        url: songInfo.videoDetails.video_url
    }

    interaction.reply('done');


    /**
     * 
     * 		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		if (!permissions.has('SPEAK')) return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');

		const serverQueue = message.client.queue.get(message.guild.id);
		const songInfo = await ytdl.getInfo(args[0].replace(/<(.+)>/g, '$1'));
		const song = {
			id: songInfo.videoDetails.videoId,
			title: Util.escapeMarkdown(songInfo.videoDetails.title),
			url: songInfo.videoDetails.video_url,
		};

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
			play(queueConstruct.songs[0]);
		}
		catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			message.client.queue.delete(message.guild.id);
			await channel.leave();
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}
     */
}

const yt: Command = {
    command: ytCommand,
    execute
}

export default yt;