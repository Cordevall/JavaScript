const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const warningSchema = require('../../schemas/warnschema')

module.exports = {
  data: new SlashCommandBuilder()
  .setName("clearwarn")
  .setDescription("This clears a members warnings")
  .addUserOption(option => option.setName('user').setDescription('The user you want to clear the member warnings of').setRequired(true)),
  async execute (interaction) {

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({content: "You don't have the permission to clear peoples warnings!", ephermal: true});

    const { options , guildId, user} = interaction;

    const target = options.getUser('user');
    
    const embed = new EmbedBuilder()


    warningSchema.findOne({ guildId: guildId, UserID: target.id, UserTag: target.tag}, async (err,data) => {
      
      if (err) throw err;

      if (data) {
        await warningSchema.findOneAndDelete({ guildId: guildId, UserID: target.id, UserTag: target.tag})
        
        embed.setColor("Green")
        .setDescription(`:white_check_mark: ${target.tag}'s warnings have been cleared`)

        interaction.reply({embeds: [embed]});
      } else {
        interaction.reply({content: `${target.tag} has no warnings to be cleared`, ephermal: (true)})
      }
    });


  }
}