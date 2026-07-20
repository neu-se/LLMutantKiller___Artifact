import { Q } from "../../../../../q";

describe("Q", () => {
    it("should correctly parse the stack line and return the file name and line number", () => {
        const stackLine = "at functionName (filename.js:10:5)";
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["filename.js", 10]);
    });

    it("should return an empty array when the stack line does not match the expected format", () => {
        const stackLine = "Invalid stack line";
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).toBe(false);
    });
});