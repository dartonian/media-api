var nconf = require('nconf');
//
nconf.argv()
    .env()
    .file({ file: '../bd/config.json' });

module.exports = nconf;