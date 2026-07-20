describe("getFileNameAndLineNumber function", () => {
    it("should return an array with two elements from a stack line", () => {
        const stackLine = "at functionName (filename.js:10:5)";
        const result = getFileNameAndLineNumber(stackLine);
        expect(result.length).toBe(2);
    });
});

function getFileNameAndLineNumber(stackLine: string): [string, number] {
    const match = stackLine.match(/at .* \((.*):(\d+):(\d+)\)/);
    if (match) {
        return [match[1], parseInt(match[2], 10)];
    } else {
        return ["Unknown", 0];
    }
}