const { SlashCommandBuilder, EmbedBuilder, Client, } = require("discord.js");
const { loadCommands } = require("../../handlers/commandhandler");
const { loadEvents } = require("../../handlers/eventhandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("reloads your events and commands")
    .addStringOption((subcommand) =>
      subcommand.setName("options").setDescription("options")
      .addChoices(
        {name: "commands", value: "commands"},
        {name: "events", value: "events"}
      )
    ),
    devonly: true,
  
    async execute(interaction, client) {
    const user = interaction.user;
    

    const sub = interaction.options.getString('options')
    const embed = new EmbedBuilder()
    .setTitle("💻 Developer")
    .setColor("DarkAqua")

    switch(sub) {
        case "commands": {
            loadCommands(client)
            interaction.reply({embeds: [embed.setDescription("✅Success commands are now loaded")] })
            console.log(`${user.username} has reloaded commands`)
        }
        break;
        case "events": {
            loadEvents(client)
            interaction.reply({embeds: [embed.setDescription("✅Success events are now loaded")] })
            console.log(`${user.username} has reloaded the events`)
        }
    }
  },
};
