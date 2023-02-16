#!usr/bin/env node

import chalk from 'chalk';
import { Select } from 'enquirer';
import execa from 'execa';
import fs from 'fs-extra';
import ora from 'ora';
import { resolve } from 'path';
import sade from 'sade';
// import semver from 'semver';

const pkg = require('../package.json');

const prog = sade('x-cli');

const { version } = pkg;

async function sleep(timer = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, timer);
  });
}

prog
  .version(version)
  .command('create <pkg>')
  .describe('choose template')
  .example('create nice-project')
  .action(async (pkg: string, args: any) => {
    console.log(
      chalk.blue(`
    .##.....##.########..######...........######..##.......####
..##...##..##.......##....##.........##....##.##........##.
...##.##...##.......##...............##.......##........##.
....###....######...##.......#######.##.......##........##.
...##.##...##.......##...............##.......##........##.
..##...##..##.......##....##.........##....##.##........##.
.##.....##.##........######...........######..########.####
`)
    );

    const prompt = new Select({
      name: 'template',
      message: 'choose a template',
      choices: ['vue', 'react'],
    });

    const template = await prompt.run();
    console.log('🚀 ~ file: index.ts:51 ~ .action ~ template', template, args);

    const projectPath = (await fs.realpath(process.cwd())) + '/' + pkg;

    const fetchSpinner = ora(`fetching template...`);
    fetchSpinner.start();
    await sleep(3000);
    fetchSpinner.stop();
    console.log('🚀 ~ fetching template');

    const copySpinner = ora(`create project by template...`);
    copySpinner.start();
    await fs.copy(resolve(__dirname, `../templates/${template}`), projectPath, {
      overwrite: true,
    });
    copySpinner.stop();
    console.log('🚀 ~ create project by template');

    // 更改工作目录
    process.chdir(projectPath);
    execa('pnpm', ['install']);
  });

prog
  .version(version)
  .command('build')
  .option('--config')
  .describe('build your project')
  .example('build --config config.js')
  .action((args: any) => {
    console.log('🚀 ~ file: index.ts:26 ~ .action ~ args', args);
  });

prog
  .version(version)
  .command('watch')
  .describe('watch your project')
  .example('watch')
  .action((args: any) => {
    console.log('🚀 ~ file: index.ts:37 ~ args', args);
  });

prog
  .version(version)
  .command('deploy')
  .describe('deploy your project')
  .example('deploy')
  .action((args: any) => {
    console.log('🚀 ~ file: index.ts:46 ~ .action ~ args', args);
  });

prog.parse(process.argv);
