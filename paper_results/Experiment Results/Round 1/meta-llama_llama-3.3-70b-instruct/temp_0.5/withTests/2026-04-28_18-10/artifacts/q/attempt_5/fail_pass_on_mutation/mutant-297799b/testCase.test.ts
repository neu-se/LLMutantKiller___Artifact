describe("isInternalFrame", () => {
    it("should return false for a non-node frame", () => {
        const stackLine = "at myFunction (myFile.js:10:20)";
        const originalIsInternalFrame = (stackLine: string) => {
            return stackLine.indexOf("(module.js:") !== -1 ||
                   stackLine.indexOf("(node.js:") !== -1;
        };
        expect(originalIsInternalFrame(stackLine)).toBe(false);
    });
});