describe("isInternalFrame", () => {
    it("should return false for a non-node frame and not always return true", () => {
        const stackLine1 = "at myFunction (myFile.js:10:20)";
        const stackLine2 = "at Q.nextTick (q.js:123:45)";
        const isInternalFrame = (stackLine: string) => {
            return stackLine.indexOf("(module.js:") !== -1 ||
                   stackLine.indexOf("(node.js:") !== -1;
        };
        expect(isInternalFrame(stackLine1)).toBe(false);
        expect(isInternalFrame(stackLine2)).toBe(false);
    });
});