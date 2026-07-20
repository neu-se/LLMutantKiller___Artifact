const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString behavior", () => {
    it("should filter out internal frames from stack traces", () => {
        // Force long stack traces to be enabled for this test
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        try {
            // Create a nested promise chain to generate internal stack frames
            return Q().then(() => {
                return Q().then(() => {
                    throw new Error("Test error");
                });
            }).catch((e: Error) => {
                const stack = e.stack;
                expect(stack).toBeDefined();
                // Check for presence of internal Q library frames
                // Original code filters them out (!isInternalFrame)
                // Mutated code includes them (isInternalFrame)
                const hasInternalFrames = stack?.includes("q.js") && stack?.includes("promiseDispatch");
                expect(hasInternalFrames).toBe(false);
                return Q();
            });
        } finally {
            Q.longStackSupport = originalLongStackSupport;
        }
    });
});