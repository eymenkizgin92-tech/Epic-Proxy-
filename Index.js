const { Relay } = require('bedrock-protocol');
const PORT = process.env.PORT || 19132;

console.log("Epic Proxy startet auf Port " + PORT);

const relay = new Relay({
  version: '1.21.90',
  host: '0.0.0.0',
  port: PORT,
  destination: {
    host: 'HYPixelBedrock oder DeinServer.de',
    port: 19132
  }
});

relay.listen();

relay.on('connect', player => {
  console.log(player.profile.name + " verbunden!");
  player.on('text', data => {
    if(data.message.startsWith('/.toggles')) {
      player.sendMessage('§a[EpicProxy] Toggles: §fFreecam, Fullbright AN');
    }
    if(data.message.startsWith('/.server')) {
      let ip = data.message.split(' ')[1];
      if(ip) {
        player.sendMessage('§aServer wird gewechselt zu: ' + ip);
        relay.options.destination.host = ip;
      }
    }
  });
});

console.log("EPIC PROXY BEREIT!");
