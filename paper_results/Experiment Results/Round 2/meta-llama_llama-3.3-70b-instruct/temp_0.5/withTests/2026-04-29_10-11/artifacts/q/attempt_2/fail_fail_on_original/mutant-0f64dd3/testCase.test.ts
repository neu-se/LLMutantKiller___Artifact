import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should capture the line number correctly", () => {
        const originalCaptureLine = Q.captureLine;
        const lineNumber = originalCaptureLine();
        const fileNameAndLineNumber = Q.getFileNameAndLineNumber(new Error().stack.split("\n")[2]);
        expect(fileNameAndLineNumber).not.toBeNull();
    });
});