import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong function", () => {
    it("should construct a long stack trace when the condition is met", () => {
        var error = new Error();
        var promise = q.defer().promise;
        promise.stackCounter = 1;
        var p = { stack: "test", stackCounter: 0 };
        var originalStackTrace = error.stack;

        q.makeStackTraceLong(error, p);

        expect(error.stack).not.toBe(originalStackTrace);
    });
});