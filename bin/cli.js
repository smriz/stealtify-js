#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const obfuscate = require('../src/index');

program
    .name('stealtify')
    .version('1.0.0')
    .description('JavaScript Obfuscator')
    .argument('<input>', 'Input JavaScript file')
    .option('-o, --output <file>', 'Output file path')
    .option('-c, --config <file>', 'Configuration file')
    .option('--no-strings', 'Disable string obfuscation')
    .option('--no-identifiers', 'Disable identifier renaming')
    .option('--no-numbers', 'Disable number obfuscation')
    .option('--no-control-flow', 'Disable control flow flattening')
    .option('--compact', 'Enable compact output')
    .option('--debug', 'Show debug info')
    .action((input, options) => {
        try {
            const inputPath = path.resolve(input);
            if (!fs.existsSync(inputPath)) {
                console.error(chalk.red(`Error: File not found - ${inputPath}`));
                process.exit(1);
            }

            const code = fs.readFileSync(inputPath, 'utf8');

            let config = {};
            if (options.config) {
                const configPath = path.resolve(options.config);
                if (fs.existsSync(configPath)) {
                    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
                }
            }

            const obfuscationConfig = {
                strings: options.strings !== false,
                identifiers: options.identifiers !== false,
                numbers: options.numbers !== false,
                controlFlow: options.controlFlow !== false,
                compact: options.compact || false,
                ...config
            };

            if (options.debug) {
                console.log(chalk.cyan('🔧 Configuration:'), obfuscationConfig);
            }

            console.log(chalk.yellow('🔄 Obfuscating...'));

            const start = Date.now();


            const obfuscated = obfuscate(code, obfuscationConfig);

            const end = Date.now();

            let outputPath = options.output;
            if (!outputPath) {
                const parsed = path.parse(input);
                outputPath = path.join(parsed.dir, `${parsed.name}.obfuscated${parsed.ext}`);
            }

            fs.writeFileSync(outputPath, obfuscated, 'utf8');

            console.log(chalk.green('Complete!'));
            console.log(chalk.blue(`Output: ${outputPath}`));
            console.log(chalk.blue(`Time: ${end - start}ms`));
            console.log(chalk.blue(`Size: ${Buffer.byteLength(obfuscated, 'utf8')} bytes`));

        } catch (error) {
            console.error(chalk.red('Error:'), error.message);
            if (options.debug) {
                console.error(chalk.gray(error.stack));
            }
            process.exit(1);
        }
    });

program.parse();