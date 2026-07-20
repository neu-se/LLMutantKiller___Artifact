describe("Q", () => {
    it("should correctly filter out Node.js frames from stack traces", () => {
        const stackLine = "    at test (/path/to/test.js:1:1)";
        const isNodeFrameOriginal = stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
        expect(isNodeFrameOriginal).toBe(false);
    });
});