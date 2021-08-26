import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

interface Command {
    command: SlashCommandBuilder;
    execute(interaction: CommandInteraction): void;
}

export { Command }
