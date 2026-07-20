import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should correctly parse stack traces", () => {
        const error = new Error("Test error");
        error.stack = "   at func1 (file1.js:10:20)\n   at func2 (file2.js:30:40)";
        const result = Q.getFileNameAndLineNumber("   at func1 (file1.js:10:20)");
        expect(result).toEqual(["file1.js", 10]);
    });
});