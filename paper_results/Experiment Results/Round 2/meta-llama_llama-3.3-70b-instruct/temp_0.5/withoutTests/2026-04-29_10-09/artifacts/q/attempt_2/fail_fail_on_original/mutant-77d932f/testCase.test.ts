import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q promise library", () => {
    it("should throw an error when getFileNameAndLineNumber is called with a stack line", () => {
        const stackLine = "at functionName (filename:10:20)";
        expect(() => {
            const result = Q.getFileNameAndLineNumber(stackLine);
            if (!result) {
                throw new Error("getFileNameAndLineNumber returned undefined");
            }
        }).toThrowError("getFileNameAndLineNumber returned undefined");
    });
});