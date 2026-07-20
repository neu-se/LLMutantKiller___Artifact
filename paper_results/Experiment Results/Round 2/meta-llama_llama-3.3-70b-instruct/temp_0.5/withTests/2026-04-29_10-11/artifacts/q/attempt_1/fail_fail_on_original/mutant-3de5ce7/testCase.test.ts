import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber function", () => {
    it("should return the correct filename and line number for a given stack line", () => {
        const stackLine = "    at foo (file.js:10:5)";
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["file.js", 10]);
    });

    it("should return null for an invalid stack line", () => {
        const stackLine = "Invalid stack line";
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).toBeNull();
    });
});