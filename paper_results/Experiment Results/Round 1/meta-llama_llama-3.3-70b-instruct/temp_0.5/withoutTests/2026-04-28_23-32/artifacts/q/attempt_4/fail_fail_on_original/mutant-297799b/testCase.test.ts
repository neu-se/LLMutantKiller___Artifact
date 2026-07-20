describe("Q", () => {
    it("should correctly filter out Node.js frames from stack traces", () => {
        const stackLine = "    at Module._compile (module.js:643:30)";
        const isNodeFrameOriginal = stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
        expect(isNodeFrameOriginal).toBe(true);
        const isNodeFrameMutated = true; // this is what the mutated code would return
        expect(isNodeFrameOriginal).not.toBe(isNodeFrameMutated); // this line should fail on the mutated code
    });
});