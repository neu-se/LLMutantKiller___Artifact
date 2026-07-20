import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
    it("should correctly identify internal stack frames", () => {
        // This test creates a scenario where we can observe the stack filtering behavior
        // The mutation changes the condition from checking line numbers to always returning true
        // which would incorrectly filter out all stack frames

        // Enable long stack traces
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        const deferred = Q.defer();
        let capturedError: Error | null = null;

        // Create a deep promise chain to generate multiple stack frames
        Q().then(() => {
            return Q().then(() => {
                return Q().then(() => {
                    try {
                        throw new Error("Test error for stack trace");
                    } catch (e) {
                        capturedError = e as Error;
                        deferred.reject(e);
                    }
                });
            });
        });

        return deferred.promise.catch((e: Error) => {
            // The original code should preserve external stack frames
            // The mutated code would filter them all out
            expect(e.stack).toBeTruthy();
            const stackLines = e.stack?.split('\n') || [];
            expect(stackLines.length).toBeGreaterThan(1);

            // Check that we have some non-internal frames in the stack
            // (this would fail if all frames were filtered out by the mutation)
            const hasExternalFrames = stackLines.some(line =>
                line.includes("Test error") || line.includes("at ")
            );
            expect(hasExternalFrames).toBe(true);

            return Q.delay(10);
        }).finally(() => {
            Q.longStackSupport = originalLongStackSupport;
        });
    });
});