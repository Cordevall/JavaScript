// const { Client, GatewayIntentBits } = require(`discord.js`);
// const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent] });

// const token = 'MTE0NDgzNTcyNTk2NDA5NTU0OA.GyCHgs.BqRWIUcdk5SlILh-uxRgB_4bC95mfscSkG8z4Y'; // Discord bot token
// const hostServerId = "1144864344803389501"; // Server to copy roles from
// const followerServerId = "1144835324502089758"; // Server to copy roles to

// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`);
//     syncRoles();
// });

// client.on('guildMemberUpdate', () => {
//     syncRoles();
// });

// async function syncRoles() {
//     const hostServer = client.guilds.cache.get(hostServerId);
//     const followerServer = client.guilds.cache.get(followerServerId);
    
//     const hostList = createHostRoleList(hostServer);

//     await createMissingRoles(hostServer, followerServer);

//     followerServer.members.cache.forEach(async (member) => {
//         const rolesToAdd = hostList[member.id];
//         if (rolesToAdd) {
//             await synchronizeRoles(member, followerServer, rolesToAdd);
//         }
//     });
// }

// function createHostRoleList(server) {
//     const hostList = {};

//     server.members.cache.forEach((member) => {
//         hostList[member.id] = member.roles.cache.map((role) => role.name);
//     });

//     return hostList;
// }

// async function createMissingRoles(hostServer, followerServer) {
//     const followerRoleNames = followerServer.roles.cache.map(role => role.name);

//     for (const role of hostServer.roles.cache.values()) {
//         if (!followerRoleNames.includes(role.name) && role.name !== "@everyone") {
//             await followerServer.roles.create({
//                 name: role.name,
//                 color: role.color
//             });
//             console.log("Creating " + role.name);
//         }
//     }
// }

// async function synchronizeRoles(member, followerServer, rolesToAdd) {
//     const rolesToRemove = member.roles.cache.filter(role => !rolesToAdd.includes(role.name) && role.name !== "@everyone");
//     rolesToRemove.filter((role)=>{return role!=null})

//     for (const role of rolesToRemove.values()) {
//         await member.roles.remove(role);
//         console.log("Removing " + role.name);
//     }    
    
//     try {
//         for (const roleName of rolesToAdd) {
//             const role = followerServer.roles.cache.find(role => role.name === roleName);
//             if (role) {
//                 await member.roles.add(role);
//             }
//         }
//     } catch (error) {
            
//     }
// }

// client.login(token);