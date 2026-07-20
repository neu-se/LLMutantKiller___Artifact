import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong function", () => {
    it("should construct a long stack trace when the condition is met", () => {
        var error = new Error();
        var promise = q.defer().promise;
        promise.stackCounter = 1;
        var p = { stack: "test", stackCounter: 0 };
        var originalStackTrace = error.stack;

        // Since makeStackTraceLong is not a public function, we need to test its behavior indirectly
        // We can do this by testing the behavior of the Q function, which uses makeStackTraceLong internally
        q.Q(p).then(() => {
            throw error;
        }).catch((e) => {
            expect(e.stack).not.toBe(originalStackTrace);
        });
    });
});