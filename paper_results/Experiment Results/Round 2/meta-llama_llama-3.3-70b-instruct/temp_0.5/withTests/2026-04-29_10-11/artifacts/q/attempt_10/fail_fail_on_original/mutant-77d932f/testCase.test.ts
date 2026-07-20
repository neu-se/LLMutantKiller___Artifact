describe("q", () => {
    it("should return a value when getFileNameAndLineNumber is called", () => {
        const q = require('../../q');
        const stackLine = "    at Object.<anonymous> (/Users/username/project/test.js:12:15)";
        const result = q.getFileNameAndLineNumber(stackLine);
        expect(result).not.toBeUndefined();
    });
});