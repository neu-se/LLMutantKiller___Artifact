describe("Q", () => {
    it("should handle stack line parsing correctly", () => {
        const stackLine = "at file.js:123:456";
        const getFileNameAndLineNumber = (stackLine: string) => {
            const attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
            if (attempt2) {
                return [attempt2[1], parseInt(attempt2[2])];
            } else {
                throw new Error("Attempt2 is null");
            }
        };
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["file.js", 123]);
        
        // Test with a stack line that has only one digit in the line number
        const stackLine2 = "at file.js:1:456";
        const result2 = getFileNameAndLineNumber(stackLine2);
        expect(result2).toEqual(["file.js", 1]);
    });
});