import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should not throw an error when getFileNameAndLineNumber function returns a valid array", () => {
        const originalGetFileNameAndLineNumber = Q.getFileNameAndLineNumber;
        Q.getFileNameAndLineNumber = () => ["filename.js", 10];
        expect(() => Q.captureLine()).not.toThrowError();
        Q.getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    });
});