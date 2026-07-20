import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should handle stack traces correctly", () => {
        var error = new Error("Test error");
        error.stack = "   at func1 (file1.js:10:20)\n   at func2 (file2.js:30:40)";
        var promise = q.Q.reject(error);
        return promise.catch((err: any) => {
            expect(err.stack).toContain("func1");
            expect(err.stack).toContain("func2");
        });
    });
});