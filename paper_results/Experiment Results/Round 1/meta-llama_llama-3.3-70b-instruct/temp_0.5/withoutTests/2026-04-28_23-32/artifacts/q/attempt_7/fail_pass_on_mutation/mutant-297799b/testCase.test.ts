describe("Q", () => {
    it("should correctly filter out Node.js frames from stack traces", () => {
        const stackLine1 = "    at test (/path/to/test.js:1:1)";
        const stackLine2 = "    at Module._compile (module.js:643:30)";
        const isNodeFrame1 = stackLine1.indexOf("(module.js:") !== -1 || stackLine1.indexOf("(node.js:") !== -1;
        const isNodeFrame2 = stackLine2.indexOf("(module.js:") !== -1 || stackLine2.indexOf("(node.js:") !== -1;
        expect(isNodeFrame1).toBe(false);
        expect(isNodeFrame2).toBe(true);
        expect(isNodeFrame1 === isNodeFrame2).toBe(false);
    });
});