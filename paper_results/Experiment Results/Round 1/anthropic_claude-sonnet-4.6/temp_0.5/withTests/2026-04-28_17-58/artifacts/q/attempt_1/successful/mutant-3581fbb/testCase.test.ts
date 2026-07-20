import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior in long stack traces", () => {
    it("should include user function frames in long stack traces, not filter them out", async () => {
        Q.longStackSupport = true;

        try {
            function outerFunction() {
                return Q().then(function innerFunction() {
                    return Q.reject(new Error("test error"));
                });
            }

            let caughtError: any = null;

            await outerFunction().catch(function(err: any) {
                caughtError = err;
            });

            expect(caughtError).not.toBeNull();
            expect(caughtError.stack).toBeDefined();
            // The stack should contain the user function name "innerFunction"
            // In the original code, non-internal and non-node frames are kept
            // In the mutated code, only node frames are kept (user frames are filtered out)
            expect(caughtError.stack).toContain("innerFunction");
        } finally {
            Q.longStackSupport = false;
        }
    });
});