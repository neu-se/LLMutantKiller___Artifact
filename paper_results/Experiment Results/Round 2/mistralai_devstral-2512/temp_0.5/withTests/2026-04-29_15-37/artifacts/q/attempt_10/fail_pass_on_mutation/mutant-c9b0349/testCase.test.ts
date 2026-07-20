import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
    it("should correctly identify internal frames by line number range", () => {
        // This test directly targets the mutation in isInternalFrame
        // Original: lineNumber >= qStartingLine && lineNumber <= qEndingLine
        // Mutated: true && lineNumber <= qEndingLine

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
            // The mutation would cause ALL frames to be considered internal
            // because the first condition (lineNumber >= qStartingLine) is replaced with true

            const stackLines = e.stack?.split('\n') || [];

            // Count frames that should be external (not from q.js)
            const externalFrames = stackLines.filter(line =>
                line.includes("at ") &&
                !line.includes("q.js") &&
                !line.includes("isInternalFrame")
            );

            // In original code: external frames should remain
            // In mutated code: ALL frames would be filtered out (externalFrames would be 0)
            expect(externalFrames.length).toBeGreaterThan(0);

            // Also verify we have some frames remaining
            expect(stackLines.length).toBeGreaterThan(1);

            return Q.delay(10);
        }).finally(() => {
            Q.longStackSupport = originalLongStackSupport;
        });
    });
});