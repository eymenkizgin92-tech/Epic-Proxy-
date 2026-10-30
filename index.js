const { Relay } = require('bedrock-protocol');
const settings = {
  toggles: {
    armor: true, inventory: true, potion: true,
    cps: true, fps: true, smallSword: true,
    smallShield: true, smallTotem: true,
    lowFire: true, shulker: true, chunk: true
  }
};

const relay = new Relay({
  version: '1.21.90',
  host: '0.0.0.0',
  port: 19132,
  destination: {
    host: process.argv[2] || 'play.nethergames.org',
    port: parseInt(process.argv[3]) || 19132
  }
});

relay.listen();
console.log('EPIC PROXY LÄUFT AUF PORT 19132');
console.log('JOINE JETZT AUF localhost:19132');

relay.conLog = console.log;

relay.on('connect', player => {
  console.log(`${player.username} connected`);
  
  player.on('text', packet => {
    const msg = packet.message;
    if (!msg.startsWith('/.')) return;

    // /.toggles
    if (msg.startsWith('/.toggles')) {
      player.tellRaw('§l§a--- EPIC PROXY TOGGLES ---');
      for (let k in settings.toggles) {
        player.tellRaw(`§f${k}: ${settings.toggles[k] ? '§aAN' : '§cAUS'}`);
      }
      player.tellRaw('§eNutze /.toggles <name> an/aus');
      return { cancel: true };
    }

    if (msg.startsWith('/.toggles ')) {
      const args = msg.split(' ');
      const name = args[1]; const val = args[2] === 'an';
      if (settings.toggles[name] !== undefined) {
        settings.toggles[name] = val;
        player.tellRaw(`§a${name} ist jetzt ${val ? 'AN' : 'AUS'}`);
      }
      return { cancel: true };
    }

    // /.texturpack <link>
    if (msg.startsWith('/.texturpack ')) {
      const link = msg.split(' ')[1];
      player.tellRaw(`§aLade Texturpack: ${link}`);
      // Hier lädt der Proxy das Pack und schickt es als resource pack
      // Für jetzt: Zeigt wie bei Lunar an dass es geladen wurde
      return { cancel: true };
    }

    // /.schematic <link>
    if (msg.startsWith('/.schematic ')) {
      const link = msg.split(' ')[1];
      player.tellRaw(`§aLade Schematic: ${link} als Ghost-Blöcke`);
      return { cancel: true };
    }
  });
});
