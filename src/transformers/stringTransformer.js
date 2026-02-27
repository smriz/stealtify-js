class StringTransformer {
    transform(ast) {
        try {


            const strings = [];
            this.collectStrings(ast, strings);
            console.log(`Found ${strings.length} strings`);

            return ast;

        } catch (error) {
            console.error('String transformer error:', error);
            return ast;
        }
    }

    collectStrings(node, collection) {
        if (!node || typeof node !== 'object') return;

        if (node.type === 'LiteralStringExpression' && node.value !== undefined) {
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
                                this.collectStrings(child[i], collection);
                            }
                        }
                    } else if (child && typeof child === 'object') {
                        this.collectStrings(child, collection);
                    }
                } catch (e) {
                    continue;
                }
            }
        }
    }
}

module.exports = new StringTransformer();