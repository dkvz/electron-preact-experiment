const net = require('net');
const port = 8080;

const exec = require('child_process').exec;

// First start the preact watch...
// But then how do we check the output?
const spawn = require('child_process').spawn;
const preactWatch = spawn('npm', ['run', 'dev']);
preactWatch.stdout.on('data', (data) => {
  console.log(`${data}`);
});
preactWatch.stderr.on('data', (data) => {
  console.log(`${data}`);
});

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
  client.end();
  if (!startedElectron) {
    console.log('starting electron');
    startedElectron = true;
    exec('npm run electron');
  }
});

tryConnection();

client.on('error', (_error) => {
  setTimeout(tryConnection, 1000);
});