import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
    it("should return the file name and line number from a stack line", () => {
        const stackLine = "at functionName (filename:lineNumber:columnNumber)";
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["filename", 1]);
    });

    it("should return an empty array if the stack line does not match the expected format", () => {
        const stackLine = "Invalid stack line";
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).toBe(false);
    });
});