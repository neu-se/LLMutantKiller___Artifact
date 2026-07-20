import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should return a value when Q.getFileNameAndLineNumber is called", () => {
        const stackLine = "    at Object.<anonymous> (/Users/username/project/test.js:12:15)";
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).not.toBeUndefined();
    });
});