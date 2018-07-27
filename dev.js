#!/usr/bin/env node

var proc = require('child_process')
var electron = './node_modules/.bin/electron'

var child = proc.spawn(electron, ['.'], {stdio: 'inherit'})
child.on('close', function (code) {
  process.exit(code)
})