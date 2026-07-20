describe("isInternalFrame", () => {
    it("should correctly identify internal frames", () => {
        const isInternalFrame = (line: string) => {
            return line.indexOf("(module.js:") !== -1 ||
                   line.indexOf("(node.js:") !== -1;
        }
        const stackLine = "at Q.filterStackString (module.js:123:45)";
        expect(isInternalFrame(stackLine)).toBe(true);
    });

    it("should correctly identify non-internal frames", () => {
        const isInternalFrame = (line: string) => {
            return line.indexOf("(module.js:") !== -1 ||
                   line.indexOf("(node.js:") !== -1;
        }
        const stackLine = "at foo (bar.js:123:45)";
        expect(isInternalFrame(stackLine)).toBe(false);
    });
});