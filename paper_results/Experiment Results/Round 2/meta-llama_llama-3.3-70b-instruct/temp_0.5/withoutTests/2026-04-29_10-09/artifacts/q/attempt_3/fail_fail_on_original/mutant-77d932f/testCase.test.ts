import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q promise library", () => {
    it("should not throw an error when getFileNameAndLineNumber is called with a stack line", () => {
        const stackLine = "at functionName (filename:10:20)";
        const getFileNameAndLineNumber = Q.getFileNameAndLineNumber || function(stackLine) {};
        expect(() => getFileNameAndLineNumber(stackLine)).not.toThrow();
    });
});