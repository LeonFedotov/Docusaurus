#!/usr/bin/env node

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

require('@babel/polyfill');
require('@babel/register')({
  babelrc: false,
  only: [__dirname, `${process.cwd()}/core`],
  plugins: [
    require('./server/translate-plugin.js'),
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
  presets: ['@babel/react', '@babel/env'],
});

// initial check that required files are present
const chalk = require('chalk');
const fs = require('fs');

const CWD = process.cwd();

if (!fs.existsSync(`${CWD}/siteConfig.js`)) {
  console.error(
    chalk.red('Error: No siteConfig.js file found in website folder!'),
  );
  process.exit(1);
}

// generate all static html files
const generate = require('./server/generate.js');

generate()
  .then(() => {
    console.log("Site built successfully. Generated files in 'build' folder.");
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
