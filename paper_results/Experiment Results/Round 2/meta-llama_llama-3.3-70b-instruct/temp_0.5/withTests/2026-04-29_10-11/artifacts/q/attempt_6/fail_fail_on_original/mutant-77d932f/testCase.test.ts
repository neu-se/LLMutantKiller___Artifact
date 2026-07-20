import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should throw an error when Q.getFileNameAndLineNumber is called with no implementation", () => {
        const originalGetFileNameAndLineNumber = Q.getFileNameAndLineNumber;
        Q.getFileNameAndLineNumber = function() {
            return undefined;
        };
        expect(() => Q.getFileNameAndLineNumber("test")).toThrowError();
        Q.getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    });
});