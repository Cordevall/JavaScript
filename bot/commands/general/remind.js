const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remind-system")
    .setDescription("This is for helpers to help remind users and save time")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to ping")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reminder")
        .setDescription("Options to remind people")
        .setRequired(true)
        .addChoices(
          { name: "punishments", value: "punishments" },
          { name: "welcome", value: "welcome" },
          { name: "commands", value: "commands" },
          { name: "reporting", value: "reporting" },
          { name: "support", value: "support" },
          { name: "applying", value: "applying" }
        )
    ),
  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.MuteMembers)
    )
      return await interaction.reply({
        content: "You don't have the permission to reminder system!",
        ephemeral: true,
      });


    config = require("../../../config.json");
    const helperRoleId =  (config.helperRoleID);
    const modRoleId =  (config.modRoleID);
    const infoChannelId =  (config.infoChannelID);
    const commandChannelId =  (config.commandChannelID)
    
    
    const options = interaction.options;
    const selectedChoice = options.getString("reminder");
    const target = options.getUser("user");
    
    
    switch (selectedChoice) {
      case "punishments":
        {
          const embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              `<@${target.id}> Please do not talk about punishments here`
            );
          interaction.reply({ embeds: [embed] });
        }
        break;

      case "welcome":
        {
          const embed1 = new EmbedBuilder()
            .setColor("Aqua")
            .setDescription(
              `Welcome to ${interaction.guild.name}, ${target.tag}! If you need any help, contact me or <@${helperRoleId}> or <@${modRoleId}>.`
            );
          interaction.reply({ embeds: [embed1] });
        }
        break;

      case "commands":
        {
          const embed2 = new EmbedBuilder()
            .setColor("Purple")
            .setDescription(
              `In order to use command ${target.tag}, I would highly recommend checking out <#${infoChannelId}>.`
            );
          interaction.reply({ embeds: [embed2] });
        }
        break;

      case "reporting":
        {
          const embed3 = new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              `In order to report ${target.tag}, I would report using /report Reason in <#${commandChannelId}>.`
            );
          interaction.reply({ embeds: [embed3] });
        }
        break;

      case "support":
        {
          const embed4 = new EmbedBuilder()
            .setColor("Green")
            .setDescription(
              `In order to get support, ${target.tag}, can you send your help to the mod mail by DMing <@${client.user.id}>.`
            );
          interaction.reply({ embeds: [embed4] });
        }
        break;

      case "applying": {
        const embed5 = new EmbedBuilder()
          .setColor("Green")
          .setDescription(
            `In order to apply, ${target.tag}, please check out the application process in <#${config.applicationChannelId}>.`
          );
        interaction.reply({ embeds: [embed5] });
      }
    }
    setTimeout((10000)); 
    interaction.deleteReply()
    
  }
};
