describe("Q", () => {
    it("should handle stack line parsing correctly", () => {
        const stackLine = "at file.js:1:456";
        const getFileNameAndLineNumber = (stackLine: string) => {
            const attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
            if (attempt2) {
                return [attempt2[1], parseInt(attempt2[2])];
            } else {
                throw new Error("Attempt2 is null");
            }
        };
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["file.js", 1]);
    });
});