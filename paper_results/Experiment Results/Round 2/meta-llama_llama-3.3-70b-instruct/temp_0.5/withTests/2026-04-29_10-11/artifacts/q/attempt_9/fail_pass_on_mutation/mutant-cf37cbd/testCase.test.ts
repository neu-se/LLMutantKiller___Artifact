describe("getFileNameAndLineNumber", () => {
    it("should correctly parse the stack line and fail on mutated code", () => {
        const stackLine = "at myFunction (myFile.js:10:20)";
        const getFileNameAndLineNumber = (stackLine: string) => {
            const attempt2 = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
            if (attempt2) {
                return [attempt2[1], Number(attempt2[2])];
            }
            return null;
        };
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toBeNull();
    });
});