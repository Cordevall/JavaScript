const { SlashCommandBuilder, EmbedBuilder } = require ('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('This is the test command to see if the bot is working!'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
        .setColor('Aqua')
        .setDescription(`Bot is working and online `)
        await interaction.reply({embeds : [embed], ephermal: true});
    }
}