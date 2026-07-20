import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when getFileNameAndLineNumber returns an empty array", () => {
        const originalGetFileNameAndLineNumber = Q.getFileNameAndLineNumber;
        Q.getFileNameAndLineNumber = () => [];
        expect(() => Q.getFileNameAndLineNumber("at functionName (filename.js:10:5)")).toThrowError();
        Q.getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    });
});