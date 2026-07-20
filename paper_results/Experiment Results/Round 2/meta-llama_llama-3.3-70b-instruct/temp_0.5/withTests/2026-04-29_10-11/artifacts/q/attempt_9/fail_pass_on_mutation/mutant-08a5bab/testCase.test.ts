describe("isInternalFrame function", () => {
    it("should return true for internal frames", () => {
        const stackLine = "(module.js:123)";
        const result = isInternalFrame(stackLine);
        expect(result).toBe(true);
    });

    it("should return false for non-internal frames", () => {
        const stackLine = "(example.js:123)";
        const result = isInternalFrame(stackLine);
        expect(result).toBe(false);
    });
});

function isInternalFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
}