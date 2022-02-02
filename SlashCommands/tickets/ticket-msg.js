const { MessageEmbed, MessageButton, MessageActionRow, CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: 'ticket',
    description: 'Ticket mesajı gönderir.',
    /**
    *
    * @param {CommandInteraction} interaction
    * @param {Client} client
    *
    */
    run: async(client, interaction) => {
        if(interaction.user.permissions === "ADMINISTRATOR") return interaction.followUp('Bu komut için gerekli yetkiniz yok!');
        const ticketbtn = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('btn1')
                    .setStyle('SUCCESS')
                    .setEmoji('🎫')
            )
        const ticketembed = new MessageEmbed()
            .setTitle(`**${interaction.guild.name} | Destek Talebi**`)
            .setColor('RED')
            .setDescription(`
                Destek talebinizi oluşturmak için aşağıdaki butona basmanız yeterlidir.

                Güvenlik nedeniyle talepleriniz kayıt altına alınmaktadır.
                Gereksiz talepler kapatılacak ve talep sahibi cezalandırılacaktır!
            `)
            .setThumbnail(interaction.guild.iconURL({ format: "png", size: 64 }))
            .setImage('https://i.hizliresim.com/ddz2x51.png')
        interaction.channel.bulkDelete(1, true)
        interaction.channel.send({ embeds: [ticketembed], components: [ticketbtn] })
    }
 }