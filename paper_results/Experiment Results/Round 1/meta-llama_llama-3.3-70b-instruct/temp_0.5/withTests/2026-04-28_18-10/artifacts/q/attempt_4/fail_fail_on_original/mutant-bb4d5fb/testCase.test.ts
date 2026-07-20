import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces based on the file name and line number", () => {
        const error = new Error();
        const originalStack = error.stack;
        const qFileName = "q.js";
        const qStartingLine = 10;
        const qEndingLine = 100;
        const filteredStack = Q.filterStackString(originalStack);
        const stackLines = filteredStack.split("\n");
        let internalFrame = false;
        stackLines.forEach((line: string) => {
            const fileNameAndLineNumber = Q.getFileNameAndLineNumber(line);
            if (fileNameAndLineNumber) {
                const fileName = fileNameAndLineNumber[0];
                const lineNumber = fileNameAndLineNumber[1];
                if (fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine) {
                    internalFrame = true;
                }
            }
        });
        expect(internalFrame).toBe(false);
    });
});