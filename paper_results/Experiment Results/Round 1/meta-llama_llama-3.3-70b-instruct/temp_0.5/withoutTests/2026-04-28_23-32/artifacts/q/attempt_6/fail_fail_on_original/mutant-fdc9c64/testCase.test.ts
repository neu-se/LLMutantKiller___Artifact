const q = require("../../../../../../../../../subject_repositories/q/q.js");

describe('q', () => {
    it('should correctly filter stack traces', () => {
        const error = new Error();
        const stack = error.stack;
        const lines = stack?.split('\n');
        const filteredStack = q.filterStackString(stack);
        const internalFrame = lines?.find(line => line.includes('isInternalFrame'));
        expect(filteredStack).not.toContain(internalFrame);
    });
});