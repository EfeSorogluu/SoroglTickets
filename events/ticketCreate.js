const client = require('../index')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId === "btn1") {
        const channel = interaction.guild.channels.create(`${interaction.user.tag}-talep`,{
            type: "GUILD_TEXT",
            permissionOverwrites: [
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                },
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                }
            ],
        });
        await interaction.reply({ content:"Talebiniz oluşturuldu!", ephemeral: true });
        const closeembed = new MessageEmbed()
        .setTitle(`**${interaction.guild.name} | Destek Talebi**`)
        .setColor('RED')
        .setDescription(`
            Hoş geldiniz ${interaction.user.tag}!
            Sorununu talep yetkililerine anlatarak çözüme ulaşabilirsin!

            Talebi kapatmak için butona basman yeterli!
        `)
        .setTimestamp()
    const closeticket = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('btn2')
                .setStyle('DANGER')
                .setEmoji('🔒')
        )
        ;(await channel).send({ embeds: [closeembed], components: [closeticket] })
    }

    if(interaction.customId === "btn2") {
        interaction.channel.permissionOverwrites.edit(interaction.user.id, { VIEW_CHANNEL: false })
        const removeticket = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('btn3')
                        .setStyle('DANGER')
                        .setEmoji('✖')
                )
        interaction.channel.send({ content: "Bu talep kapatıldı! Silmek ister misin?", components: [removeticket] })
    }
    if(interaction.customId === "btn3") {
        interaction.channel.delete()
    }

    if(!interaction.customId === "btn1") return;
    if(!interaction.customId === "btn2") return; 
    if(!interaction.customId === "btn3") return; 
})