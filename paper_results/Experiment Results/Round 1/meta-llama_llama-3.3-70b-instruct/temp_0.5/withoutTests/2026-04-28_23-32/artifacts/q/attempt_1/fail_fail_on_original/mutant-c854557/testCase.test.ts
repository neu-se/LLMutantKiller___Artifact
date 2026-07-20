import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle stack line parsing correctly", () => {
        const stackLine = "at file.js:123:456";
        const getFileNameAndLineNumber = Q.getFileNameAndLineNumber;
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["file.js", 123]);
    });
});