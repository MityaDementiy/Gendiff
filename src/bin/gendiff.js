#!/usr/bin/env node

import commander from 'commander';

const program = new commander.Command();

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-V, --version', 'output usage information')
  .option('-f, --format [type]', 'Output format')
  .action(() => {
    program.help();
  })
  .parse(process.argv);

if (!program.args.length) program.help();
