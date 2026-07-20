import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should capture the line number correctly", () => {
        const error = new Error();
        const stackLines = error.stack.split("\n");
        const fileNameAndLineNumber = Q.getFileNameAndLineNumber(stackLines[2]);
        if (fileNameAndLineNumber) {
            expect(fileNameAndLineNumber).not.toBeNull();
        } else {
            throw new Error("fileNameAndLineNumber is null or undefined");
        }
    });
});