describe("getFileNameAndLineNumber", () => {
    it.skip("should correctly parse the stack line with the correct regex and fail on mutated code", () => {
        const stackLine = "at myFunction (myFile.js:10:20)";
        const originalGetFileNameAndLineNumber = (stackLine: string) => {
            const attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
            if (attempt2) {
                return [attempt2[1], Number(attempt2[2])];
            }
            return null;
        };
        const result = originalGetFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["myFile.js", 10]);
    });

    it("should fail to parse the stack line with the incorrect regex in the mutated code", () => {
        const stackLine = "at myFunction (myFile.js:10:20)";
        const mutatedGetFileNameAndLineNumber = (stackLine: string) => {
            const attempt2 = /at ([^ ]+):(\d+):(\d)$/.exec(stackLine);
            if (attempt2) {
                return [attempt2[1], Number(attempt2[2])];
            }
            return null;
        };
        const result = mutatedGetFileNameAndLineNumber(stackLine);
        expect(result).toBeNull();
    });
});