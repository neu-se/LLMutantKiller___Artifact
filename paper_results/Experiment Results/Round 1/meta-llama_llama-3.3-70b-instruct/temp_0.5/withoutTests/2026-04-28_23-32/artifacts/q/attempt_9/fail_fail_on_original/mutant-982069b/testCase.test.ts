const q = require('../../../../q');

describe("Q", () => {
    it("should filter out internal and node frames from stack traces", () => {
        const error = new Error();
        error.stack = `Error
    at internalFrame (q.js:1000:10)
    at nodeFrame (node.js:100:10)
    at userFrame (user.js:10:10)`;
        const filteredStack = q.filterStackString(error.stack);
        expect(filteredStack).toContain("userFrame");
        expect(filteredStack).not.toContain("internalFrame");
        expect(filteredStack).not.toContain("nodeFrame");
    });
});