const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString behavior", () => {
    it("should filter out internal frames from stack traces", () => {
        // Force long stack traces to be enabled for this test
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        try {
            // Create a promise chain that will generate a stack trace
            return Q().then(() => {
                throw new Error("Test error");
            }).catch((e: Error) => {
                // The stack trace should not contain internal Q frames
                // when using original code (!isInternalFrame)
                // but will contain them when mutated (isInternalFrame)
                const stack = e.stack;
                expect(stack).toBeDefined();
                // This will fail with mutated code because internal frames will be included
                expect(stack?.includes("at filterStackString")).toBe(false);
                return Q();
            });
        } finally {
            Q.longStackSupport = originalLongStackSupport;
        }
    });
});