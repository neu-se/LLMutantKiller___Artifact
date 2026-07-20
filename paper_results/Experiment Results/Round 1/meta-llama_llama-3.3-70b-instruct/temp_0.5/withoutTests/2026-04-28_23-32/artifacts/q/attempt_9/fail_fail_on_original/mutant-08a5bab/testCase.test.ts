import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const isInternalFrame = function(line) {
            const fileNameAndLineNumber = Q.getFileNameAndLineNumber(line);
            return fileNameAndLineNumber && fileNameAndLineNumber[0] === Q.qFileName && fileNameAndLineNumber[1] >= Q.qStartingLine;
        };
        const error = new Error();
        const stack = error.stack;
        const lines = stack?.split("\n");
        if (!lines) {
            throw new Error("Error stack is not defined");
        }
        const desiredLines = lines.filter(line => !isInternalFrame(line));
        const filteredStack = desiredLines.join("\n");
        expect(filteredStack).not.toContain("q.js");
    });
});