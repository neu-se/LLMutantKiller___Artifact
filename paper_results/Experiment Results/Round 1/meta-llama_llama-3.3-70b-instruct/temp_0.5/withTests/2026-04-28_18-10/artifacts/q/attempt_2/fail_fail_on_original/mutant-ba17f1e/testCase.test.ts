import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
    it("should return the file name and line number from a stack line", () => {
        const stackLine = "at functionName (filename.js:10:5)";
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["filename.js", 10]);
    });

    it("should handle the case where the file name and line number are not extracted", () => {
        const stackLine = "at functionName (filename.js:10:5)";
        const originalGetFileNameAndLineNumber = Q.getFileNameAndLineNumber;
        Q.getFileNameAndLineNumber = () => [];
        const result = Q.getFileNameAndLineNumber(stackLine);
        Q.getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
        expect(result).toEqual([]);
    });
});