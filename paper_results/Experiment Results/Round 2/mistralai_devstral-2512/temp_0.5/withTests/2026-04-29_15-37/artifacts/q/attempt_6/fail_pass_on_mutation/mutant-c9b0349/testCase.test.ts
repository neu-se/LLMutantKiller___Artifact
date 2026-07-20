import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
    it("should correctly filter stack frames based on line number range", () => {
        // This test directly targets the isInternalFrame function's line number check
        // The mutation changes: lineNumber >= qStartingLine && lineNumber <= qEndingLine
        // To: true && lineNumber <= qEndingLine (always true for first condition)

        // Enable long stack traces
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        // Create a promise that will generate stack traces
        const deferred = Q.defer();
        let testError: Error;

        // Create a promise chain to generate stack frames
        Q().then(() => {
            try {
                throw new Error("Test error");
            } catch (e) {
                testError = e as Error;
                deferred.reject(e);
            }
        });

        return deferred.promise.catch((e: Error) => {
            // The original code should filter internal Q frames but keep external ones
            // The mutated code would incorrectly keep ALL frames (including internal ones)

            const stackLines = e.stack?.split('\n') || [];

            // Count frames that contain "q.js" (internal frames)
            const internalFrames = stackLines.filter(line =>
                line.includes("q.js") && line.includes("at ")
            );

            // In the original code, internal frames should be filtered out
            // In the mutated code, they would remain (making this test fail)
            expect(internalFrames.length).toBe(0);

            // Also verify we have some external frames remaining
            const externalFrames = stackLines.filter(line =>
                line.includes("at ") && !line.includes("q.js")
            );
            expect(externalFrames.length).toBeGreaterThan(0);

            return Q.delay(10);
        }).finally(() => {
            Q.longStackSupport = originalLongStackSupport;
        });
    });
});