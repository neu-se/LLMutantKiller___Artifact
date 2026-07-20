describe("isInternalFrame function", () => {
    it("should return false for non-internal frames when line number is greater than qStartingLine", () => {
        const stackLine = `at isInternalFrame (q.js:100:1)`;
        const result = lineNumber <= qEndingLine;
        expect(result).toBe(false);
    });
});

const qStartingLine = 100;
const qEndingLine = 50;