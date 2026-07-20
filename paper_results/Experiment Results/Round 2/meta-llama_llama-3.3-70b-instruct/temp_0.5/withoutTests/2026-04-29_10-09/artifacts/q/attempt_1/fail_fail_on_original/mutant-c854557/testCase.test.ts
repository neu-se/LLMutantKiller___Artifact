import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly parse stack lines with column numbers", () => {
        const error = new Error();
        error.stack = "at foo (bar.js:12:34)";
        const stackLines = error.stack.split("\n");
        const getFileNameAndLineNumber = Q.getFileNameAndLineNumber;
        const result = getFileNameAndLineNumber(stackLines[0]);
        expect(result).toEqual(["bar.js", 12]);
    });
});