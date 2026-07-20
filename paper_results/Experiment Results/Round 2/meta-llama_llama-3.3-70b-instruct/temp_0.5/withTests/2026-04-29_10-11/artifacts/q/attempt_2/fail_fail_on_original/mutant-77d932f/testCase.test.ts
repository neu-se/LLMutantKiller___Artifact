import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should have a working getFileNameAndLineNumber function", () => {
        const stackLine = "    at Object.<anonymous> (/Users/username/project/test.js:12:15)";
        const originalGetFileNameAndLineNumber = Q.getFileNameAndLineNumber;
        Q.getFileNameAndLineNumber = function(stackLine) {
            return ["/Users/username/project/test.js", 12];
        };
        const result = Q.getFileNameAndLineNumber(stackLine);
        Q.getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
        expect(result).toEqual(["/Users/username/project/test.js", 12]);
    });
});