# preact material app

Super performant `Material` app for preact world using [preact-material-components](https://github.com/prateekbh/preact-material-components)

## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).

## MES NOTES

Normalement il fallait ajouter ça à package.json pour Electron:

  "homepage": "./",
  "main": "electron/main.js",

J'ai omis le "homepage".

Faut pouvoir build l'appli Electron maintenant.

Dans package.json, dans l'objet script, j'ai juste ajouté ça:

  "electron": "electron .",

Et maintenant si on lance, en séquence, `npm run dev` dans un onglet puis `npm run electron`, ça fonctionne avec mon URL Electron placée sur localhost:8080.

Je pourrais créer un script infernal qui doit lancer des trucs dans node_modules/.bin:
```
#!/usr/bin/env node

var proc = require('child_process')
var electron = './node_modules/.bin/electron'

var child = proc.spawn(electron, '.', {stdio: 'inherit'})
child.on('close', function (code) {
  process.exit(code)
})
```