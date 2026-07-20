describe('Q', () => {
    it('should filter out internal and node frames from stack traces', () => {
        const error = new Error();
        const stack = error.stack;

        if (stack) {
            const lines = stack.split('\n');
            const filteredLinesOriginal = lines.filter(line => {
                return !isInternalFrame(line) && !isNodeFrame(line) && line;
            });
            const filteredLinesMutated = lines.filter(line => {
                return !isInternalFrame(line) && isNodeFrame(line) && line;
            });

            const originalLength = filteredLinesOriginal.length;
            const mutatedLength = filteredLinesMutated.length;

            // In the original code, the length of the filtered lines should be less than or equal to the length of the original lines.
            // In the mutated code, the length of the filtered lines should be greater than the length of the original lines.
            expect(originalLength).toBeLessThanOrEqual(lines.length);
            expect(mutatedLength).toBeGreaterThan(originalLength);
        } else {
            expect(stack).not.toBeNull();
        }
    });
});

function isInternalFrame(stackLine: string): boolean {
    const fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
    if (!fileNameAndLineNumber) {
        return false;
    }
    const fileName = fileNameAndLineNumber[0];
    const lineNumber = fileNameAndLineNumber[1];
    // For the purpose of this test, we assume that the internal file name is 'q.js'
    return fileName.includes('q.js') && lineNumber >= 10 && lineNumber <= 1000;
}

function isNodeFrame(stackLine: string): boolean {
    return stackLine.indexOf('(module.js:') !== -1 || stackLine.indexOf('(node.js:') !== -1;
}

function getFileNameAndLineNumber(stackLine: string): [string, number] | null {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    const attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }

    return null;
}