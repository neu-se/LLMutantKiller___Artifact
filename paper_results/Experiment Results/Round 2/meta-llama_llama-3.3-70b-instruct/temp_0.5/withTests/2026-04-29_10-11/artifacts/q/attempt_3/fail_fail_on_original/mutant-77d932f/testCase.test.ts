import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should throw an error when getFileNameAndLineNumber is not implemented", () => {
        const originalGetFileNameAndLineNumber = Q.getFileNameAndLineNumber;
        Q.getFileNameAndLineNumber = function(stackLine) {
            return undefined;
        };
        expect(() => Q.getFileNameAndLineNumber("test")).toThrowError();
        Q.getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    });
});