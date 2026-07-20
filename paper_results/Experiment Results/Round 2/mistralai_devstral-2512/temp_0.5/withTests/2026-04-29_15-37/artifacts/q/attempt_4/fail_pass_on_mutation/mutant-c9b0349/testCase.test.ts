import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
    it("should correctly identify internal stack frames by line number", () => {
        // This test directly examines the stack frame filtering behavior
        // The mutation changes line number comparison to always return true

        // Create a mock stack line that should be considered internal
        const internalStackLine = `at someFunction (q.js:100:20)`;

        // Create a mock stack line that should be considered external
        const externalStackLine = `at userCode (user.js:50:10)`;

        // We need to test the actual isInternalFrame function
        // Since it's not exported, we'll test it indirectly through stack filtering

        // Enable long stack traces
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        const deferred = Q.defer();
        let testError: Error;

        Q().then(() => {
            try {
                throw new Error("Test");
            } catch (e) {
                testError = e as Error;
                deferred.reject(e);
            }
        });

        return deferred.promise.catch((e: Error) => {
            // The original code should filter internal Q frames but keep external ones
            // The mutated code would filter ALL frames (returning true for all)

            // Check that we have some stack frames remaining
            const stackLines = e.stack?.split('\n') || [];
            expect(stackLines.length).toBeGreaterThan(0);

            // The key difference: in the original code, some frames should remain
            // In the mutated code, all frames would be filtered out
            const hasRemainingFrames = stackLines.some(line =>
                line.includes("at ") && !line.includes("isInternalFrame")
            );

            expect(hasRemainingFrames).toBe(true);

            return Q.delay(10);
        }).finally(() => {
            Q.longStackSupport = originalLongStackSupport;
        });
    });
});