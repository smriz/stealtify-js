class ControlFlowTransformer {
    transform(ast) {
        try {
            const functionBodies = [];
            this.collectFunctionBodies(ast, functionBodies);

            if (functionBodies.length > 0) {
                const body = functionBodies[0];
                if (body && body.statements && body.statements.length > 3) {
                    this.flattenStatements(body);
                }
            }

            return ast;
        } catch (error) {
            console.error('Control flow transformer error:', error);
            return ast;
        }
    }

    collectFunctionBodies(node, collection) {
        if (!node || typeof node !== 'object') return;

        if (node.type === 'FunctionBody') {
            collection.push(node);
            return;
        }

        if (node.type === 'FormalParameters') {
            return;
        }


        for (const key in node) {
            if (node.hasOwnProperty(key)) {
                const child = node[key];
                if (Array.isArray(child)) {
                    for (let i = 0; i < child.length; i++) {
                        if (child[i] && typeof child[i] === 'object') {
                            this.collectFunctionBodies(child[i], collection);
                        }
                    }
                } else if (child && typeof child === 'object') {
                    this.collectFunctionBodies(child, collection);
                }
            }
        }
    }

    flattenStatements(functionBody) {
        try {

            const statements = [...functionBody.statements];


            if (statements.length < 4) return;

            const switchName = '_s' + Math.random().toString(36).substr(2, 4);
            const indexName = '_i' + Math.random().toString(36).substr(2, 4);


            const controlArray = {
                type: 'ArrayExpression',
                elements: statements.map((_, i) => ({
                    type: 'LiteralNumericExpression',
                    value: i
                }))
            };


            const cases = statements.map((statement, i) => ({
                type: 'SwitchCase',
                test: {
                    type: 'LiteralNumericExpression',
                    value: i
                },
                consequent: [statement]
            }));


            for (let i = 0; i < cases.length - 1; i++) {
                cases[i].consequent.push({ type: 'BreakStatement' });
            }


            const switchStatement = {
                type: 'SwitchStatement',
                discriminant: {
                    type: 'IdentifierExpression',
                    name: switchName
                },
                cases: cases
            };


            const indexVar = {
                type: 'VariableDeclarationStatement',
                declaration: {
                    type: 'VariableDeclaration',
                    kind: 'let',
                    declarators: [{
                        type: 'VariableDeclarator',
                        binding: {
                            type: 'BindingIdentifier',
                            name: indexName
                        },
                        init: {
                            type: 'LiteralNumericExpression',
                            value: 0
                        }
                    }]
                }
            };


            const switchVar = {
                type: 'VariableDeclarationStatement',
                declaration: {
                    type: 'VariableDeclaration',
                    kind: 'let',
                    declarators: [{
                        type: 'VariableDeclarator',
                        binding: {
                            type: 'BindingIdentifier',
                            name: switchName
                        },
                        init: controlArray
                    }]
                }
            };


            const whileLoop = {
                type: 'WhileStatement',
                test: {
                    type: 'LiteralBooleanExpression',
                    value: true
                },
                body: {
                    type: 'BlockStatement',
                    block: {
                        type: 'Block',
                        statements: [switchStatement]
                    }
                }
            };

            functionBody.statements = [indexVar, switchVar, whileLoop];

        } catch (error) {
            console.error('Error in flattenStatements:', error);
        }
    }
}

module.exports = new ControlFlowTransformer();