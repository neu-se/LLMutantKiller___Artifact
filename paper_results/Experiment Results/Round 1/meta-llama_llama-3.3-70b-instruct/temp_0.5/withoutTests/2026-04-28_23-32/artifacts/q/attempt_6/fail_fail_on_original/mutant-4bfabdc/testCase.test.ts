describe('Q', () => {
    it('should filter internal and Node frames from stack traces', () => {
        const Q = require('../../../../../q.js');
        const stack = "Error\n    at internalFrame (internal.js:1:1)\n    at nodeFrame (node.js:2:2)\n    at externalFrame (external.js:3:3)";
        const filteredStack = Q.filterStackString(stack);

        const internalFrameLine = "    at internalFrame (internal.js:1:1)";
        const nodeFrameLine = "    at nodeFrame (node.js:2:2)";
        const externalFrameLine = "    at externalFrame (external.js:3:3)";

        expect(filteredStack).toContain(externalFrameLine);
        expect(filteredStack).not.toContain(internalFrameLine);
        expect(filteredStack).not.toContain(nodeFrameLine);
    });
});