import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber function", () => {
    it("should return the correct file name and line number", () => {
        const stackLine = "at functionName (filename.js:10:20)";
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["filename.js", 10]);
    });

    it("should return an empty array if the stack line is not in the correct format", () => {
        const stackLine = "not a valid stack line";
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).toEqual([]);
    });
});