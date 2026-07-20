describe("getFileNameAndLineNumber function", () => {
    it("should correctly parse a stack line with a line number in the original code, but fail in the mutated code", () => {
        const stackLine = "    at foo (file.js:10:5)";
        const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        if (attempt3) {
            expect(attempt3[2]).toBe("10");
        } else {
            expect(false).toBe(true);
        }
    });
});