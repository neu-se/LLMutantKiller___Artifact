import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should make a long stack trace only if the error is not null", () => {
        const error = new Error();
        const promise = Q.resolve();
        const originalStackTrace = error.stack;
        makeStackTraceLong(error, promise);
        expect(error.stack).not.toBe(originalStackTrace);
        error.stack = originalStackTrace; // restore original stack

        const nullError = null;
        makeStackTraceLong(nullError, promise);
        expect(nullError).toBeNull();
    });
});