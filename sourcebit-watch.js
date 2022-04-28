const sourcebit = require('sourcebit');
const sourcebitConfig = require('./sourcebit.js');

sourcebitConfig.plugins[2].options.liveUpdate = true;
sourcebit.fetch(sourcebitConfig);