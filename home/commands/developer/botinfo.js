const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');


module.exports = {
data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('describes bot info'),
async execute(interaction) {
    const embed = new EmbedBuilder()
    .setTitle("Bot Info")
    .setColor("Yellow")
    .setDescription("")
    .setAuthor("Eveeify")
    }
};