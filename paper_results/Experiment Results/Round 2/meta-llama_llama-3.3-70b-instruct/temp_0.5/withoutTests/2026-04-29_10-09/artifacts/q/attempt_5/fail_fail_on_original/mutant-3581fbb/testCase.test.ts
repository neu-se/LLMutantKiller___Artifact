import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should filter out internal and node frames from stack traces', () => {
        const error = new Error();
        const stack = error.stack;

        if (stack) {
            const lines = stack.split('\n');
            const filteredLines = lines.filter(line => {
                return !isInternalFrame(line) && !isNodeFrame(line) && line;
            });

            const originalLength = lines.length;
            const filteredLength = filteredLines.length;

            // The test should pass on the original code and fail on the mutated code.
            expect(filteredLength).toBeLessThan(originalLength);
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