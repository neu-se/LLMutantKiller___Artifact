import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const stackTrace = error.stack;

        const lines = stackTrace.split("\n");
        const filteredLines = lines.filter(line => {
            const fileNameAndLineNumber = Q.getFileNameAndLineNumber(line);
            if (!fileNameAndLineNumber) {
                return false;
            }
            const fileName = fileNameAndLineNumber[0];
            const lineNumber = fileNameAndLineNumber[1];
            return !(fileName === Q.qFileName && lineNumber <= Q.qEndingLine);
        });
        const result = filteredLines.join("\n");

        expect(result).not.toContain("q.js");
    });
});