#!/usr/bin/env node

import commander from 'commander';

const program = new commander.Command();

program
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-v, --version', 'output usage information')
    .option('-f, --format [type]', 'Output format')
    .action(() => {
        console.log('Hello, World!');
    })
    .parse(process.argv);