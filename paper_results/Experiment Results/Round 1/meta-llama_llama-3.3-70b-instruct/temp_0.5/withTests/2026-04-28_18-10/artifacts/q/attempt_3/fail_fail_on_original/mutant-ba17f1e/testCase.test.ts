import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when attempting to get the file name and line number from a stack line with an incorrect format", () => {
        const stackLine = "Invalid stack line";
        const originalGetFileNameAndLineNumber = Q.getFileNameAndLineNumber;
        Q.getFileNameAndLineNumber = () => [];
        expect(() => Q.getFileNameAndLineNumber(stackLine)).toThrowError();
        Q.getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    });
});