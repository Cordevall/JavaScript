const { SlashCommandBuilder, EmbedBuilder, Client, } = require("discord.js");
const { start } = require("../index");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("reloads your events and commands"),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor(process.env.pending)
      .setFooter({
        text: "Cordevall - https://github.com/Cordevall",
        iconURL: "https://avatars.githubusercontent.com/u/143160364?s=200&v=4"
      })
      .setDescription(`Reloading Coredevall commands..`);

    interaction.reply({ embeds: [embed], ephemeral: true });

    setTimeout(() => {
      const embed = new EmbedBuilder()
        .setColor(process.env.success)
        .setFooter({
          text: "Cordevall - https://github.com/Cordevall",
          iconURL: "https://avatars.githubusercontent.com/u/143160364?s=200&v=4"
        })
        .setDescription(`Successfully Reloaded Cordevall 🎉🥳`);

      interaction.editReply({ embeds: [embed], ephemeral: true })
    }, 2000);
    start();
  },
};
