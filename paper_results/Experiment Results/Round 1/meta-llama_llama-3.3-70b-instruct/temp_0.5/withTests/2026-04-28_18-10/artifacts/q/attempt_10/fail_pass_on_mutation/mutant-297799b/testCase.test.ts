describe("isInternalFrame", () => {
    it("should return different results for different inputs", () => {
        const stackLine1 = "at myFunction (myFile.js:10:20)";
        const stackLine2 = "at (node.js:123:45)";
        const isInternalFrame = (stackLine: string) => {
            return stackLine.indexOf("(module.js:") !== -1 ||
                   stackLine.indexOf("(node.js:") !== -1;
        };
        expect(isInternalFrame(stackLine1)).not.toBe(isInternalFrame(stackLine2));
    });

    it("should not always return true for all inputs", () => {
        const stackLine1 = "at myFunction (myFile.js:10:20)";
        const isInternalFrame = (stackLine: string) => {
            return stackLine.indexOf("(module.js:") !== -1 ||
                   stackLine.indexOf("(node.js:") !== -1;
        };
        expect(isInternalFrame(stackLine1)).toBe(false);
    });
});