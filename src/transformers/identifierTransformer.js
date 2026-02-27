class IdentifierTransformer {
    constructor() {
        this.nameMap = new Map();
        this.reservedNames = new Set([
            'console', 'require', 'module', 'exports', 'process',
            '__dirname', '__filename', 'global', 'Buffer',
            'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
            'JSON', 'Math', 'Date', 'Array', 'Object', 'String',
            'Number', 'Boolean', 'RegExp', 'Error', 'Promise',
            'parseInt', 'parseFloat', 'isNaN', 'isFinite',
            'log', 'now', 'keys', 'values', 'entries'
        ]);
    }

    transform(ast) {
        try {
            this.collectIdentifiers(ast);

            this.renameIdentifiers(ast);

            return ast;

        } catch (error) {
            console.error('Identifier transformer error:', error);
            return ast;
        }
    }

    collectIdentifiers(node) {
        if (!node || typeof node !== 'object') return;

        if (node.type === 'BindingIdentifier' && node.name) {
            if (!this.reservedNames.has(node.name) && !node.name.startsWith('_')) {
                if (!this.nameMap.has(node.name)) {
                    this.nameMap.set(node.name, this.generateName(node.name));
                }
            }
        }

        if (node.type === 'FunctionDeclaration' && node.name && node.name.name) {
            if (!this.reservedNames.has(node.name.name) && !node.name.name.startsWith('_')) {
                if (!this.nameMap.has(node.name.name)) {
                    this.nameMap.set(node.name.name, this.generateName(node.name.name));
                }
            }
        }

        if (node.type === 'LiteralStringExpression' ||
            node.type === 'LiteralNumericExpression' ||
            node.type === 'LiteralBooleanExpression' ||
            node.type === 'LiteralNullExpression' ||
            node.type === 'LiteralRegExpExpression') {
            return;
        }

        for (const key in node) {
            if (node.hasOwnProperty(key)) {
                try {
                    const child = node[key];
                    if (Array.isArray(child)) {
                        for (let i = 0; i < child.length; i++) {
                            if (child[i] && typeof child[i] === 'object') {
                                this.collectIdentifiers(child[i]);
                            }
                        }
                    } else if (child && typeof child === 'object') {
                        this.collectIdentifiers(child);
                    }
                } catch (e) {
                    continue;
                }
            }
        }
    }

    renameIdentifiers(node) {
        if (!node || typeof node !== 'object') return node;

        if (node.type === 'BindingIdentifier' && node.name) {
            const newName = this.nameMap.get(node.name);
            if (newName) {
                node.name = newName;
            }
            return node;
        }

        if (node.type === 'IdentifierExpression' && node.name) {
            const newName = this.nameMap.get(node.name);
            if (newName) {
                node.name = newName;
            }
            return node;
        }

        if (node.type === 'FunctionDeclaration' && node.name) {
            if (node.name.name) {
                const newName = this.nameMap.get(node.name.name);
                if (newName) {
                    node.name.name = newName;
                }
            }
        }

        if (node.type === 'FunctionExpression' && node.name) {
            if (node.name.name) {
                const newName = this.nameMap.get(node.name.name);
                if (newName) {
                    node.name.name = newName;
                }
            }
        }

        if (node.type === 'CallExpression' && node.callee) {
            if (node.callee.type === 'IdentifierExpression' && node.callee.name) {
                const newName = this.nameMap.get(node.callee.name);
                if (newName) {
                    node.callee.name = newName;
                }
            }
        }

        if (node.type === 'FormalParameter' && node.binding) {
            if (node.binding.name) {
                const newName = this.nameMap.get(node.binding.name);
                if (newName) {
                    node.binding.name = newName;
                }
            }
        }

        if (node.type === 'VariableDeclarator') {
            if (node.binding && node.binding.name) {
                const newName = this.nameMap.get(node.binding.name);
                if (newName) {
                    node.binding.name = newName;
                }
            }
        }

        if (node.type === 'LiteralStringExpression' ||
            node.type === 'LiteralNumericExpression' ||
            node.type === 'LiteralBooleanExpression' ||
            node.type === 'LiteralNullExpression' ||
            node.type === 'LiteralRegExpExpression') {
            return node;
        }

        // Traverse all properties
        for (const key in node) {
            if (node.hasOwnProperty(key)) {
                try {
                    const child = node[key];
                    if (Array.isArray(child)) {
                        for (let i = 0; i < child.length; i++) {
                            if (child[i] && typeof child[i] === 'object') {
                                child[i] = this.renameIdentifiers(child[i]);
                            }
                        }
                    } else if (child && typeof child === 'object') {
                        node[key] = this.renameIdentifiers(child);
                    }
                } catch (e) {

                    continue;
                }
            }
        }

        return node;
    }

    generateName(original) {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let result = '_' + original;
        for (let i = 0; i < 4; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }
}

module.exports = new IdentifierTransformer();