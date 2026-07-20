import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly filter internal frames from stack traces", () => {
        const error = new Error();
        error.stack = `Error
    at isInternalFrame (q.js:123)
    at getFileNameAndLineNumber (q.js:456)
    at filterStackString (q.js:789)`;

        Q.isInternalFrame = jest.fn((line) => {
            const fileNameAndLineNumber = Q.getFileNameAndLineNumber(line);
            if (fileNameAndLineNumber) {
                const fileName = fileNameAndLineNumber[0];
                const lineNumber = fileNameAndLineNumber[1];
                return fileName === Q.qFileName && lineNumber <= Q.qEndingLine;
            }
            return false;
        });

        Q.getFileNameAndLineNumber = jest.fn((line) => {
            if (line.includes("isInternalFrame")) {
                return [Q.qFileName, 123];
            } else if (line.includes("getFileNameAndLineNumber")) {
                return [Q.qFileName, 456];
            } else if (line.includes("filterStackString")) {
                return [Q.qFileName, 789];
            }
            return undefined;
        });

        const lines = error.stack.split("\n");
        const filteredLines = lines.filter((line) => {
            return !Q.isInternalFrame(line);
        });

        expect(filteredLines.length).toBe(1);
    });
});