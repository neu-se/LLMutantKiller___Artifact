import { Q } from "../../../../../q";

describe("q", () => {
    it("should correctly parse stack traces", () => {
        const error = new Error("Test error");
        error.stack = "   at func1 (file1.js:10:20)\n   at func2 (file2.js:30:40)";
        const promise = Q(error);
        expect(promise.stack).toContain("file1.js:10:20");
        const mutatedError = new Error("Test error");
        mutatedError.stack = "   at func1 (file1.js:10)\n   at func2 (file2.js:30)";
        const mutatedPromise = Q(mutatedError);
        expect(mutatedPromise.stack).not.toContain("file1.js:10:20");
    });
});