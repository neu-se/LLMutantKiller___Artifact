import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle stack line parsing correctly", () => {
        const stackLine = "at file.js:123:456";
        const error = new Error();
        error.stack = stackLine;
        const getFileNameAndLineNumber = Q.getFileNameAndLineNumber;
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["file.js", 123]);
        const attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
        expect(attempt2).not.toBeNull();
        expect(attempt2[1]).toBe("file.js");
        expect(attempt2[2]).toBe("123");
    });
});