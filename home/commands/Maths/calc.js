const { SlashCommandBuilder, ButtonBuilder } = require('@discordjs/builders');

module.exports = {
data: new SlashCommandBuilder()
    .setName('cac')
    .setDescription('Opens a calculator up'),
async execute(interaction) {
     
    }
};