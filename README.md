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

Une source à conserver: https://medium.com/@cjus/desktop-apps-using-electron-preact-and-material-design-8161938624c6

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

J'ai aussi vu ça sinon:
```
"start": "NODE_ENV=development npm-run-all build:transpilewrap --parallel dev thenelectron",
"dev": "webpack-dev-server --hot --inline --progress",
"thenelectron": "sleep 2; electron ./app",
```
Mais c'est basé sur un paquet à installer "npm-run-all", et puis le truc foireux "sleep 2".

Puis en gros je pense qu'il va falloir utiliser une variable d'environement.

Sous Windows il faudra emballer tout dans un script bat qui exporte les bonnes variables d'env.

TODO: Je dois toujours tester ce qui se passe si on build l'app, puis on met la variable d'environement de dev: est-ce que j'ai le bidule de dev? Doit être possible à tester depuis une app Electron normale et pas ce bidule preact bizarre.