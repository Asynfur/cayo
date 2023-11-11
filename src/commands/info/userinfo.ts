import { Command } from "../../structures/Command";
import { EmbedBuilder } from 'discord.js'

export default new Command({
    name: "userinfo",
    description: "Get information about a user",
    options: [{ name: 'user', type: 6, required: false, description: 'The user to get information about' }],
    run: async ({ interaction }) => {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = interaction.member;
    
        const embed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle(`${user.tag}`)
          .setThumbnail(user.displayAvatarURL())
          .addFields(
            { name: 'ID', value: user.id },
            { name: 'Status', value: member.presence?.status || 'No se pudo obtener el estatus' },
            { name: 'Joined Server', value: member.joinedAt ? member.joinedAt.toLocaleDateString('en-US') : 'No se pudo obtener la fecha'},
            { name: 'Account Created', value: user.createdAt.toLocaleDateString('en-US') },
            { name: 'Roles', value: member.roles.cache.map(role => role.toString()).join(', ') },
            { name: 'Nickname', value: member.nickname || 'None' },
            { name: 'Permissions', value: member.permissions.toArray().join(', ') },
          )
          .setTimestamp()
          .setFooter({ text: 'User Info'});
    
        await interaction.reply({ embeds: [embed] });
    }
});