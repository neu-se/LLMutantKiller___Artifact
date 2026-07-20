import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should correctly handle isInternalFrame function", () => {
        const stackLine = "at foo (q.js:10:20)";
        const qFileName = "q.js";
        const qStartingLine = 1;
        const qEndingLine = 1000;
        const fileNameAndLineNumber = q.getFileNameAndLineNumber(stackLine);
        if (!fileNameAndLineNumber) {
            expect(true).toBe(false);
        } else {
            const fileName = fileNameAndLineNumber[0];
            const lineNumber = fileNameAndLineNumber[1];
            const isInternalFrame = fileName === qFileName &&
                lineNumber >= qStartingLine &&
                lineNumber <= qEndingLine;
            expect(isInternalFrame).toBe(true);
        }
    });
});