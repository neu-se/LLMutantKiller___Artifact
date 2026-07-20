function getFileNameAndLineNumber(stackLine: string) {
    // implementation of getFileNameAndLineNumber function
    const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    const attempt2 = /at ([^ ]+):(\d+):(?:\d)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }

    return null;
}

describe('q', () => {
    it('should correctly parse the stack line', () => {
        const stackLine = "    at functionName (filename:10:columnNumber)";
        const result = getFileNameAndLineNumber(stackLine);
        if (result !== null) {
            expect(result[0]).toBe("filename");
            expect(result[1]).toBe(10);
        } else {
            expect(true).toBe(false);
        }
    });
});