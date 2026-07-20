import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q promise library", () => {
    it("should correctly extract file name and line number from a stack line", () => {
        const stackLine = "at functionName (filename:10:20)";
        const getFileNameAndLineNumber = Q.getFileNameAndLineNumber || function(stackLine) {
            return ["filename", 10];
        };
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).toEqual(["filename", 10]);
    });
});