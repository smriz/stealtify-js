class NumberTransformer {
    transform(ast) {
        try {

            const numbers = [];
            this.collectNumbers(ast, numbers);
            console.log(`Found ${numbers.length} numbers`);


            return ast;

        } catch (error) {
            console.error('Number transformer error:', error);
            return ast;
        }
    }

    collectNumbers(node, collection) {
        if (!node || typeof node !== 'object') return;

        if (node.type === 'LiteralNumericExpression' && node.value !== undefined) {
            collection.push(node.value);
            return;
        }

        for (const key in node) {
            if (node.hasOwnProperty(key)) {
                try {
                    const child = node[key];
                    if (Array.isArray(child)) {
                        for (let i = 0; i < child.length; i++) {
                            if (child[i] && typeof child[i] === 'object') {
                                this.collectNumbers(child[i], collection);
                            }
                        }
                    } else if (child && typeof child === 'object') {
                        this.collectNumbers(child, collection);
                    }
                } catch (e) {
                    continue;
                }
            }
        }
    }
}

module.exports = new NumberTransformer();