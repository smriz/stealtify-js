const { parseScript } = require('shift-parser');
const generate = require('shift-codegen').default || require('shift-codegen');
const stringTransformer = require('./transformers/stringTransformer');
const identifierTransformer = require('./transformers/identifierTransformer');
const numberTransformer = require('./transformers/numberTransformer');
const controlFlowTransformer = require('./transformers/controlFlowTransformer');

function obfuscate(code, options = {}) {
    const config = {
        strings: true,
        identifiers: true,
        numbers: true,
        controlFlow: false,
        compact: false,
        ...options
    };

    try {
        console.log('Parsing code...');
        let ast = parseScript(code);
        console.log('AST parsed successfully');

        if (config.strings) {
            console.log('Applying string transformer...');
            ast = stringTransformer.transform(ast);
            console.log('String transformer complete');
        }

        if (config.numbers) {
            console.log('Applying number transformer...');
            ast = numberTransformer.transform(ast);
            console.log('Number transformer complete');
        }

        if (config.identifiers) {
            console.log('Applying identifier transformer...');
            ast = identifierTransformer.transform(ast);
            console.log('Identifier transformer complete');
        }

        if (config.controlFlow) {
            ast = controlFlowTransformer.transform(ast);
        }

        console.log('Generating code...');
        let obfuscatedCode = generate(ast);

        if (config.compact) {
            obfuscatedCode = obfuscatedCode
                .replace(/\s+/g, ' ')
                .replace(/\n/g, '')
                .replace(/; /g, ';');
        }

        console.log('Obfuscation complete!');
        return obfuscatedCode;

    } catch (error) {
        console.error('Error details:', error);
        throw new Error(`Obfuscation failed: ${error.message}`);
    }
}

module.exports = obfuscate;