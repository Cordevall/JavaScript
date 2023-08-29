const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
      .setName("info")
      .setDescription("Provides information on a selected topic")
      .addStringOption(option => option
        .setName("topic")
        .setDescription("Select a topic")
        .setChoices(
          { name: 'Discord Bot', value: 'bot' },
          { name: 'Discord Server', value: 'server' },
          { name: 'Commands', value: 'commands' },
          { name: 'Fun', value: 'fun' }
        )
        .setRequired(true)
      ),
    emoji: '🤓',
    async execute(interaction, client) {
      const options = interaction.options;
      const choice = options.getString('topic');
      switch (choice) {
        case "bot": {

          const packageJson = require("../package.json");
          const dependencies = packageJson.dependencies;
          
          // Replace ^ with @ and remove ' and " from dependency versions
          const updatedDependencies = Object.keys(dependencies).reduce((acc, key) => {
            const version = dependencies[key].replace(/\^/g, ' v').replace(/['"]/g, '');
            const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
            acc.push(`> ${capitalizedKey}:${version}`);
            return acc;
          }, []);
          
          const updatedDependenciesString = updatedDependencies.join(",\n");
          
          // Remove trailing comma
          const formattedDependenciesString = updatedDependenciesString.replace(/,\n$/, '');
          
          console.log(formattedDependenciesString);
          
         

          // Embed
          const embed = new EmbedBuilder()
            .setTitle(`**Cordevall Discord Bot Info**`)
            .setColor(0xffff00)
            .setThumbnail("https://avatars.githubusercontent.com/u/143160364?s=200&v=4")
            .setFooter({
              text: "Cordevall - https://github.com/Cordevall",
              iconURL: "https://avatars.githubusercontent.com/u/143160364?s=200&v=4"
            })
            .setDescription(`

              **Language:**
              > Made in Javascript ES6

              **Dependencies:**
              ${formattedDependenciesString}

              **Bot Overview:**
              > Cordevall is an exceptional open-source Discord bot service known for its versatility and user-friendly approach. With support for various programming languages like JavaScript, Python, and Lua, Cordevall provides a dynamic platform for bot enthusiasts of all coding backgrounds.Its extensive library of easy tutorials simplifies installation and customization, even for beginners. Whether you're into crafting interactive experiences with JavaScript, harnessing Python's power for data-driven functionalities, or exploring Lua for lightweight efficiency, Cordevall seamlessly accommodates your preferences. Elevate your bot development experience and bring creative ideas to life in the Discord ecosystem effortlessly. Don't wait—start using it today!
            `);

          interaction.reply({ embeds: [embed], ephemeral: true });
          break;
        }
        case "server": {
          const guild = interaction.guild;
          const guildName = guild.name;
          const guildIcon = guild.icon;
          const guildMemberCount = guild.members.cache.filter((member)=>{
            return !member.user.bot
          }).size;
          const guildBotCount = guild.members.cache.filter((member)=>{return member.user.bot}).size;
          const guildChannelCount = guild.channels.cache.size;

          const embed = new EmbedBuilder()
            .setTitle(`**'${guildName}' Server Info**`)
            .setColor(0xffff00)
            .setThumbnail(guildIcon)
            .setFooter({
              text: "Cordevall - https://github.com/Cordevall",
              iconURL: "https://avatars.githubusercontent.com/u/143160364?s=200&v=4"
            })
            .setDescription(`

              **Stats**
              > 🤖 Bots: ${guildBotCount.toLocaleString()}
              > 🙋‍♂️ Members: ${guildMemberCount.toLocaleString()}
              > 📃 Channels: ${guildChannelCount.toLocaleString()}
              > 👑 Server Owner: <@${guild.ownerId}>
              > 💻 Server Id: \`${guild.id}\`
              > 📌 Server Rules: <#${guild.rulesChannelId}>
            `);

          interaction.reply({ embeds: [embed], ephemeral: true });
          break;
        }
        case "commands": {
          let commands = ``;
          client.commands.forEach(command => {
            let emoji = command.emoji?command.emoji:'❓';
            commands += `> ${emoji} **/${command.data.name}** - ${command.data.description}\n`
          });

          const embed = new EmbedBuilder()
            .setTitle(`**Cordevall Bot Commands**`)
            .setColor(0xffff00)
            .setFooter({
              text: "Cordevall - https://github.com/Cordevall",
              iconURL: "https://avatars.githubusercontent.com/u/143160364?s=200&v=4"
            })
            .setDescription(`

              **Commands**
              ${commands}
            `);

          interaction.reply({ embeds: [embed], ephemeral: true });
          break;
        }
        case "fun": {

          break;
        }
      }
    }
}