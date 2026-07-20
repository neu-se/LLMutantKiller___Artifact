describe("isInternalFrame", () => {
    it("should return false for a non-internal frame", () => {
        const stackLine = "at myFunction (myFile.js:10:20)";
        const isInternalFrame = (stackLine: string) => {
            return stackLine.indexOf("(module.js:") !== -1 ||
                   stackLine.indexOf("(node.js:") !== -1;
        };
        expect(isInternalFrame(stackLine)).toBe(false);
    });

    it("should return false for a non-node frame", () => {
        const stackLine = "at Q.nextTick (q.js:123:45)";
        const isInternalFrame = (stackLine: string) => {
            return stackLine.indexOf("(module.js:") !== -1 ||
                   stackLine.indexOf("(node.js:") !== -1;
        };
        expect(isInternalFrame(stackLine)).toBe(false);
    });
});