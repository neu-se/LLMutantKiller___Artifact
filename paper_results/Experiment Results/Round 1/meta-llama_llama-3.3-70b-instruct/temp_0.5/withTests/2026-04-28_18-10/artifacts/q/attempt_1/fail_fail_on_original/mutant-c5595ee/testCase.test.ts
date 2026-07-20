import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly parse the stack line with the changed regex", () => {
        var error = new Error();
        error.stack = "    at foo@http://example.com:10:5";
        var fileNameAndLineNumber = Q.getFileNameAndLineNumber(error.stack.split("\n")[0]);
        expect(fileNameAndLineNumber).toEqual(["http://example.com", 10]);
    });
});