describe('Q', () => {
    it('should filter internal and Node frames from stack traces', () => {
        const stack = "Error\n    at internalFrame (internal.js:1:1)\n    at nodeFrame (node.js:2:2)\n    at externalFrame (external.js:3:3)";
        const lines = stack.split('\n');
        const filteredLines = lines.filter(line => !line.includes('internal.js') && !line.includes('node.js'));
        const filteredStack = filteredLines.join('\n');

        const Q = require('../../../../../q.js');
        const qFilteredStack = Q.filterStackString(stack);

        expect(qFilteredStack).toBe("Error\n    at externalFrame (external.js:3:3)");
    });
});