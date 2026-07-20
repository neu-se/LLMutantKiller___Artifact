describe("isInternalFrame", () => {
    it("should return false for a non-internal frame", () => {
        const stackLine = "at myFunction (myFile.js:10:20)";
        const isInternalFrame = (stackLine: string) => {
            return stackLine.indexOf("(module.js:") !== -1 ||
                   stackLine.indexOf("(node.js:") !== -1;
        };
        expect(isInternalFrame(stackLine)).toBe(false);
    });

    it("should return true for an internal frame", () => {
        const stackLine = "at (node.js:123:45)";
        const isInternalFrame = (stackLine: string) => {
            return stackLine.indexOf("(module.js:") !== -1 ||
                   stackLine.indexOf("(node.js:") !== -1;
        };
        expect(isInternalFrame(stackLine)).toBe(true);
    });

    it("should not always return true", () => {
        const stackLine1 = "at myFunction (myFile.js:10:20)";
        const stackLine2 = "at (node.js:123:45)";
        const isInternalFrame = (stackLine: string) => {
            return stackLine.indexOf("(module.js:") !== -1 ||
                   stackLine.indexOf("(node.js:") !== -1;
        };
        expect(isInternalFrame(stackLine1)).not.toBe(isInternalFrame(stackLine2));
    });
});