import { getFileNameAndLineNumber } from "../q.js";

describe("getFileNameAndLineNumber", () => {
    it("should correctly parse the filename and line number from a stack line", () => {
        const stackLine = "at functionName (filename.js:10:20)";
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["filename.js", 10]);
    });

    it("should return false if the stack line does not match the expected format", () => {
        const stackLine = "at functionName";
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toBe(false);
    });
});