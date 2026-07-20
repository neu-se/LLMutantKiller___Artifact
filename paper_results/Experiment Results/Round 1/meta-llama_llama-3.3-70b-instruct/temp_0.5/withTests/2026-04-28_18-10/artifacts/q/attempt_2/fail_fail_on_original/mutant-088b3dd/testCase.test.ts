import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
    it("should correctly parse the filename and line number from a stack line", () => {
        const stackLine = "at functionName (filename.js:10:20)";
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["filename.js", 10]);
    });

    it("should return false if the stack line does not match the expected format", () => {
        const stackLine = "at functionName";
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).toBe(false);
    });
});