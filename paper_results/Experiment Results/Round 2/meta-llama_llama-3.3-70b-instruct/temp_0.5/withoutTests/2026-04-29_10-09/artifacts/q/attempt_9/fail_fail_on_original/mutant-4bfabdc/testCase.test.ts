describe("Q.filterStackString", () => {
    it("should filter out internal and Node frames correctly", () => {
        const Q = require('./q');
        const error = new Error();
        error.stack = `Error
    at foo (internal/index.js:1:1)
    at bar (node:internal/process/promises:1:1)
    at baz (example.js:1:1)`;
        const filteredStack = Q.filterStackString(error.stack);
        expect(filteredStack).toContain('example.js');
        expect(filteredStack).not.toContain('internal/index.js');
        expect(filteredStack).not.toContain('node:internal/process/promises');
        // Additional expectation to make the test fail on the mutated code
        const lines = filteredStack.split('\n');
        expect(lines.length).toBe(1);
    });
});