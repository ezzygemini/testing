const Jasmine = require('jasmine');
const path = require('path');
const fs = require('fs');

/**
 * Core function that will execute a set of jasmine sets.
 *
 * @param {string} type The type of testing to do.
 * @param {object} config The object configuration for the jasmine spec.
 * @returns {Promise.<void>}
 */
const promiseFn = (type, config) => {

  if (typeof config === 'string') {
    type += `  (test/${config}/*.js)`;
    config = {
      'spec_dir': `test/${config}`,
      'spec_files': ['*.js', '**/*.js']
    };
  }

  return new Promise((resolve, reject) => {

    fs.exists(path
    // jscs:disable
      .normalize(process.cwd() + '/' + config['spec_dir']), (e, exists) => {
      // jscs:enable

      if (e) {
        console.error(`Error ${type}`);
        return reject(e);
      }

      if (!exists) {
        console.log(`Skipped ${type}`);
        return resolve();
      }

      const jasmine = new Jasmine();

      jasmine.loadConfig(Object.assign({
        'spec_dir': 'test',
        'spec_files': []
      }, config));

      console.log(`Running: ${type}`);

      return resolve(jasmine.execute());
    });

  });
};

module.exports = promiseFn;
