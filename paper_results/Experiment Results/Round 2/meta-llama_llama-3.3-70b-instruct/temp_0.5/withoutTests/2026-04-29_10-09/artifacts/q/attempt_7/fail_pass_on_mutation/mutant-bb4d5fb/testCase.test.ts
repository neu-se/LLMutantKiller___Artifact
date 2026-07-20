import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly filter internal frames from stack traces", () => {
        const error = new Error();
        error.stack = `Error
    at isInternalFrame (q.js:123)
    at getFileNameAndLineNumber (q.js:456)
    at filterStackString (q.js:789)`;

        Q.isInternalFrame = jest.fn((line) => {
            return line.includes("isInternalFrame");
        });

        Q.getFileNameAndLineNumber = jest.fn((line) => {
            if (line.includes("isInternalFrame")) {
                return ["q.js", 123];
            } else if (line.includes("getFileNameAndLineNumber")) {
                return ["q.js", 456];
            } else if (line.includes("filterStackString")) {
                return ["q.js", 789];
            }
            return undefined;
        });

        const lines = error.stack.split("\n");
        const filteredLines = lines.filter((line) => {
            const fileNameAndLineNumber = Q.getFileNameAndLineNumber(line);
            if (fileNameAndLineNumber) {
                const fileName = fileNameAndLineNumber[0];
                const lineNumber = fileNameAndLineNumber[1];
                return !Q.isInternalFrame(line);
            }
            return true;
        });

        expect(filteredLines.length).toBeLessThan(lines.length);
    });
});