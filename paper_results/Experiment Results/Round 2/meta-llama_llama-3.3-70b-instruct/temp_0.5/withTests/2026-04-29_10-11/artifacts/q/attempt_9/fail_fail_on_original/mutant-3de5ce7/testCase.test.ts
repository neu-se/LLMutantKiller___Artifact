describe("getFileNameAndLineNumber function", () => {
    it("should correctly parse a stack line with a line number in the original code, but fail in the mutated code", () => {
        const stackLine = "    at foo (file.js:10:5)";
        const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        expect(attempt3).not.toBeNull();

        // This line should cause the test to fail in the mutated code
        expect(attempt3[2]).toBe("10");
    });
});