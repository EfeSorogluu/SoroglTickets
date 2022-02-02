const client = require("../index");

client.once("ready", () => {
    console.log(client.user.tag + " Bot Hazır!");
    client.user.setPresence({status: "dnd", activities: [{name: "By EfeSoroglu#0001", type: "PLAYING" }]});
});