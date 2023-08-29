const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { MongoClient } = require("mongodb");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("checkwarn")
    .setDescription("Checks a member's warnings")
    .addUserOption(option => option.setName('user').setDescription('The user you want to check warns').setRequired(true)),
  async execute(interaction) {
    const { options, guildId, user } = interaction;

    const target = options.getUser('user');
    const embed = new EmbedBuilder();
    const noWarns = new EmbedBuilder();

    try {
      const uri = process.env.mongoDB;
      const client = new MongoClient(uri);

      await client.connect();
      console.log('Connected to the database');

      const database = client.db("WarningSystem");
      const warningCollection = database.collection("warnings");

      const data = await warningCollection.findOne({ guildId: guildId, UserID: target.id, UserTag: target.tag });

      if (data) {
        embed
          .setColor('Red')
          .setDescription(
            `:x: ${target.tag}'s warnings:\n${data.Content
              .map(
                (w, i) =>
                  `**Warning**: ${i + 1}\n**Warning Moderator**: ${w.ExecuterTag}\n**Warning Reason**: ${w.Reason}\n`
              )
              .join('-')}`
          );

        interaction.reply({ embeds: [embed] });
      } else {
        noWarns.setColor('Green').setDescription(`:white_check_mark: ${target.tag} has **0** Warnings!`);

        interaction.reply({ ephemeral: true, embeds: [noWarns] });
      }
    } catch (err) {
      console.error(err);
      interaction.reply({ content: 'An error occurred while checking warnings', ephemeral: true });
    } finally {
      await client.close();
      console.log('Disconnected from the database');
    }
  },
};
