import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
    it("should filter internal stack frames based on exact line number range", () => {
        // Enable long stack traces to trigger stack filtering
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        const deferred = Q.defer();
        let testError: Error;

        // Create a deep promise chain to generate multiple stack frames
        Q().then(() => {
            return Q().then(() => {
                return Q().then(() => {
                    try {
                        // Throw error from within Q's code path
                        throw new Error("Test error from Q");
                    } catch (e) {
                        testError = e as Error;
                        deferred.reject(e);
                    }
                });
            });
        });

        return deferred.promise.catch((e: Error) => {
            // The original code should filter internal Q frames
            // The mutated code (with "true &&") would NOT filter them properly

            const stackLines = e.stack?.split('\n') || [];

            // Look for frames that should be filtered (internal Q frames)
            const hasInternalFrames = stackLines.some(line =>
                line.includes("q.js") &&
                line.includes("at ") &&
                !line.includes("isInternalFrame")
            );

            // In original code: internal frames should be filtered out (false)
            // In mutated code: internal frames would remain (true)
            expect(hasInternalFrames).toBe(false);

            // Also verify we have some frames remaining (external ones)
            expect(stackLines.length).toBeGreaterThan(0);

            return Q.delay(10);
        }).finally(() => {
            Q.longStackSupport = originalLongStackSupport;
        });
    });
});