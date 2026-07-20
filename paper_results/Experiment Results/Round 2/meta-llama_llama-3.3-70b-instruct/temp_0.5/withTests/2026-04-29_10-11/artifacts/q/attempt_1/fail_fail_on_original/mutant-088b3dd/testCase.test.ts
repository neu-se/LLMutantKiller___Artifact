import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber function", () => {
    it("should return the correct file name and line number", () => {
        var stackLine = "at functionName (filename.js:10:20)";
        var result = Q.getFileNameAndLineNumber(stackLine);
        expect(result[0]).toBe("filename.js");
        expect(result[1]).toBe(10);
    });

    it("should handle anonymous functions", () => {
        var stackLine = "at filename.js:10:20";
        var result = Q.getFileNameAndLineNumber(stackLine);
        expect(result[0]).toBe("filename.js");
        expect(result[1]).toBe(10);
    });

    it("should handle Firefox style stack traces", () => {
        var stackLine = "function@filename.js:10";
        var result = Q.getFileNameAndLineNumber(stackLine);
        expect(result[0]).toBe("filename.js");
        expect(result[1]).toBe(10);
    });
});