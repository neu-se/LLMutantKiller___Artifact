import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should get file name and line number from a stack line", () => {
        const stackLine = "at functionName (filename:1:2)";
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["filename", 1]);
    });
});