import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
    it("should correctly parse the stack line with the correct regex", () => {
        const stackLine = "at myFunction (myFile.js:10:20)";
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["myFile.js", 10]);
    });
});