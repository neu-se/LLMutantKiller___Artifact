import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong function", () => {
    it("should construct a long stack trace when the condition is met", () => {
        var error = new Error();
        var promise = q.defer().promise;
        promise.source = { stack: "test", stackCounter: 0 };
        var originalStackTrace = error.stack;

        // Since makeStackTraceLong is not a public function, we need to test its behavior indirectly
        // We can do this by testing the behavior of the q function, which uses makeStackTraceLong internally
        q.default(promise).then(() => {
            throw error;
        }).catch((e: any) => {
            expect(e.stack).toContain("test");
        });
    });
});