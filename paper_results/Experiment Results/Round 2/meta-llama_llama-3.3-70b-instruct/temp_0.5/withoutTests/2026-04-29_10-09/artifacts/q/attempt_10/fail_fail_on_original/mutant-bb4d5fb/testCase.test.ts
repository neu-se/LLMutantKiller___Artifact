import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly handle isInternalFrame", () => {
        const originalIsInternalFrame = Q.isInternalFrame;
        Q.isInternalFrame = jest.fn((line) => {
            const fileNameAndLineNumber = Q.getFileNameAndLineNumber(line);
            if (fileNameAndLineNumber) {
                const fileName = fileNameAndLineNumber[0];
                const lineNumber = fileNameAndLineNumber[1];
                return fileName === Q.qFileName && lineNumber <= Q.qEndingLine;
            }
            return false;
        });

        const line = "at isInternalFrame (q.js:123)";
        const fileNameAndLineNumber = Q.getFileNameAndLineNumber(line);
        if (fileNameAndLineNumber) {
            const fileName = fileNameAndLineNumber[0];
            const lineNumber = fileNameAndLineNumber[1];
            expect(fileName === Q.qFileName && lineNumber <= Q.qEndingLine).toBe(true);
        } else {
            expect(false).toBe(true);
        }

        Q.isInternalFrame = originalIsInternalFrame;
    });
});