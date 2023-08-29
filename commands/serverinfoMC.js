const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfomc")
    .setDescription("Displays server info about the server.")
    .addStringOption((option) =>
      option
        .setName("ip")
        .setDescription("The ip of the server you want to see the status of.")
        .setRequired(true)
    ),
    emoji: "📊",

    async execute(interaction) {
    const ipop = interaction.options.getString("ip");

    function initServerData(serverIp) {
      axios.get(`https://mcapi.us/server/status?ip=${serverIp}`)
        .then((response) => response.data)
        .then((data) => {
          if (data.server.name === null) {
            interaction.reply(
              "This server is either offline or you provided an invalid address."
            );
          } else {
            const embed = new EmbedBuilder()
              .setTitle("**Server Status**")
              .addFields(
                {
                  name: "__Status:__",
                  value: `\`\`\`${data.online ? "Online" : "Offline"}\`\`\``,
                  inline: true,
                },
                {
                  name: "__Message of the day:__",
                  value: `\`\`\`${data.motd ? `${data.motd}` : "not available"}\`\`\``,
                  inline: true,
                },
                {
                  name: "__Players:__",
                  value: `\`\`\`${data.players.now}/${data.players.max}\`\`\``,
                  inline: true,
                },
                {
                  name: "__Server Version:__",
                  value: `\`\`\`${data.server.name}\`\`\``,
                  inline: true,
                }
              )
              .setTimestamp()
              .setColor(process.env.success);
            interaction.reply({ embeds: [embed]});
          }
        })
        .catch((error) => {
          console.error(error);
          interaction.reply("An error occurred while fetching server information.");
        });
    }

    initServerData(ipop);
  },
};
