describe("getFileNameAndLineNumber function", () => {
    it("should throw an error when parsing a stack line with a non-numeric line number in the mutated code, but not in the original code", () => {
        const originalStackLine = "    at foo (file.js:10:5)";
        const originalAttempt3 = /.*@(.+):(\d+)$/.exec(originalStackLine);
        expect(originalAttempt3).not.toBeNull();

        const mutatedStackLine = "    at foo (file.js:10:5)";
        const mutatedAttempt3 = /.*@(.+):(\D+)$/.exec(mutatedStackLine);
        expect(mutatedAttempt3).toBeNull();
    });
});