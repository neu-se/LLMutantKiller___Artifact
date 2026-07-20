import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong function", () => {
    it("should construct a long stack trace when the condition is met", () => {
        var error = new Error();
        var promise = Q();
        var originalStackTrace = error.stack;

        makeStackTraceLong(error, promise);

        expect(error.stack).not.toBe(originalStackTrace);
    });
});