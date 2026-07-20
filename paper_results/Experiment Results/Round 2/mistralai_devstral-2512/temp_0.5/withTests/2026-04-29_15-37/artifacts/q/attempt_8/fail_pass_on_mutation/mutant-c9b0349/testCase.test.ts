import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
    it("should correctly filter stack frames based on line number comparison", () => {
        // This test targets the specific mutation in isInternalFrame
        // Original: lineNumber >= qStartingLine && lineNumber <= qEndingLine
        // Mutated: true && lineNumber <= qEndingLine

        // Enable long stack traces
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        const deferred = Q.defer();
        let testError: Error;

        // Create a promise chain with multiple levels to generate stack frames
        Q().then(() => {
            return Q().then(() => {
                return Q().then(() => {
                    try {
                        throw new Error("Test error");
                    } catch (e) {
                        testError = e as Error;
                        deferred.reject(e);
                    }
                });
            });
        });

        return deferred.promise.catch((e: Error) => {
            // The key difference between original and mutated code:
            // Original filters frames where lineNumber >= qStartingLine
            // Mutated keeps all frames (true && ...) so more frames remain

            const stackLines = e.stack?.split('\n') || [];

            // Count frames that contain "q.js" (potential internal frames)
            const qFrames = stackLines.filter(line =>
                line.includes("q.js") && line.includes("at ")
            );

            // In original code: most q.js frames should be filtered out
            // In mutated code: more q.js frames would remain
            // We expect original to have fewer internal frames
            expect(qFrames.length).toBeLessThan(5);

            // Also verify we have some frames remaining
            expect(stackLines.length).toBeGreaterThan(0);

            return Q.delay(10);
        }).finally(() => {
            Q.longStackSupport = originalLongStackSupport;
        });
    });
});