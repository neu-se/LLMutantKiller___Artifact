describe("getFileNameAndLineNumber function", () => {
    it("should throw an error when parsing a stack line with a non-numeric line number in the mutated code", () => {
        const stackLine = "    at foo (file.js:a:5)";
        const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        expect(attempt3).toBeNull();
    });
});