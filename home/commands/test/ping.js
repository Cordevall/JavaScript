const { SlashCommandBuilder, EmbedBuilder, ActivityType } = require ('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('This command tests the ping of the bot'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setColor('Aqua')
        .setDescription(`Ping Pong! ${client.ws.ping}ms. `)
        await interaction.reply({embeds : [embed], ephermal: true});
    }
}