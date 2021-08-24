import { SlashCommandBuilder } from "@discordjs/builders";

interface Command {
    name: string;
    slashCommand: SlashCommandBuilder;
    execute(): null;
}

export { Command }