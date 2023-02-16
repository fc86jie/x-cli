#!usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const enquirer_1 = require("enquirer");
const execa_1 = tslib_1.__importDefault(require("execa"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const ora_1 = tslib_1.__importDefault(require("ora"));
const path_1 = require("path");
const sade_1 = tslib_1.__importDefault(require("sade"));
// import semver from 'semver';
const pkg = require('../package.json');
const prog = (0, sade_1.default)('x-cli');
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
    .action(async (pkg, args) => {
    console.log(chalk_1.default.blue(`
    .##.....##.########..######...........######..##.......####
..##...##..##.......##....##.........##....##.##........##.
...##.##...##.......##...............##.......##........##.
....###....######...##.......#######.##.......##........##.
...##.##...##.......##...............##.......##........##.
..##...##..##.......##....##.........##....##.##........##.
.##.....##.##........######...........######..########.####
`));
    const prompt = new enquirer_1.Select({
        name: 'template',
        message: 'choose a template',
        choices: ['vue', 'react'],
    });
    const template = await prompt.run();
    console.log('🚀 ~ file: index.ts:51 ~ .action ~ template', template, args);
    const projectPath = (await fs_extra_1.default.realpath(process.cwd())) + '/' + pkg;
    const fetchSpinner = (0, ora_1.default)(`fetching template...`);
    fetchSpinner.start();
    await sleep(3000);
    fetchSpinner.stop();
    console.log('🚀 ~ fetching template');
    const copySpinner = (0, ora_1.default)(`create project by template...`);
    copySpinner.start();
    await fs_extra_1.default.copy((0, path_1.resolve)(__dirname, `../templates/${template}`), projectPath, {
        overwrite: true,
    });
    copySpinner.stop();
    console.log('🚀 ~ create project by template');
    // 更改工作目录
    process.chdir(projectPath);
    (0, execa_1.default)('pnpm', ['install']);
});
prog
    .version(version)
    .command('build')
    .option('--config')
    .describe('build your project')
    .example('build --config config.js')
    .action((args) => {
    console.log('🚀 ~ file: index.ts:26 ~ .action ~ args', args);
});
prog
    .version(version)
    .command('watch')
    .describe('watch your project')
    .example('watch')
    .action((args) => {
    console.log('🚀 ~ file: index.ts:37 ~ args', args);
});
prog
    .version(version)
    .command('deploy')
    .describe('deploy your project')
    .example('deploy')
    .action((args) => {
    console.log('🚀 ~ file: index.ts:46 ~ .action ~ args', args);
});
prog.parse(process.argv);
