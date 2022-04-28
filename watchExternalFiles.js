const glob = require("glob");
const { resolve } = require("path");
const dirTree = require("directory-tree"); 
const fs = require('fs');
const sourcebit = require('sourcebit');
const sourcebitConfig = require('./sourcebit.js');

const PLUGIN_NAME = "WebpackWatchExternalFilesPlugin";

const getExternalFilesToWatch = (files) => {
  const { filesToWatch, filesToExclude } = files.reduce(
    (obj, pattern) => {
      if (pattern[0] !== "!") {
        const files = glob.sync(pattern);
        obj.filesToWatch.push(...files);
      } else {
        const files = glob.sync(pattern.substr(1));
        obj.filesToExclude.push(...files);
      }
      return obj;
    },
    {
      filesToWatch: [],
      filesToExclude: [],
    }
  );

  const resolvedFilesToWatch = Array.from(
    new Set(filesToWatch.filter((file) => !filesToExclude.includes(file)))
  ).map((file) => {
    return resolve(file)
  });

  return resolvedFilesToWatch;
};

function WatchExternalFilesPlugin({ files = [] }) {
  this.apply = (compiler) => {
    // sourcebit.fetch(sourcebitConfig);

    const logger = compiler.getInfrastructureLogger(PLUGIN_NAME);
    compiler.hooks.initialize.tap(PLUGIN_NAME, (_compilation) => {
      logger.info("Watching External Files :", files);
    });

    compiler.hooks.afterCompile.tapAsync(
      PLUGIN_NAME,
      (compilation, callback) => {
        const filesToWatch = getExternalFilesToWatch(files);

        filesToWatch.map((file) => compilation.fileDependencies.add(file));

        // sourcebit.fetch(sourcebitConfig);
        callback();
      }
    );
  };
}

module.exports = WatchExternalFilesPlugin;