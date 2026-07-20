describe("getFileNameAndLineNumber", () => {
    it("should correctly parse stack lines", () => {
        const stackLine = "at foo.js:123:4";
        const getFileNameAndLineNumber_original = (stackLine) => {
            var attempt2 = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
            return attempt2;
        };
        const getFileNameAndLineNumber_mutated = (stackLine) => {
            var attempt2 = /at ([^ ]+):(\d+):(\d)$/.exec(stackLine);
            return attempt2;
        };
        const result_original = getFileNameAndLineNumber_original(stackLine);
        const result_mutated = getFileNameAndLineNumber_mutated(stackLine);
        expect(result_original![2]).toBe("123");
        expect(result_mutated![2]).toBe("4");
    });
});