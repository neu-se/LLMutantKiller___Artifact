import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle error in makeStackTraceLong", () => {
        const error = new Error();
        const promise = Q.resolve();
        const originalStackTrace = error.stack;
        makeStackTraceLong(error, promise);
        expect(error.stack).not.toBe(originalStackTrace);
        error.stack = originalStackTrace; // restore original stack

        const nullError = null;
        expect(() => makeStackTraceLong(nullError, promise)).not.toThrow();
        expect(makeStackTraceLong(nullError, promise)).toBeUndefined();
    });
});