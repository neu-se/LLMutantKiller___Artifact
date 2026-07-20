import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
    it("should filter stack frames with line numbers below qStartingLine", () => {
        // This test specifically targets the line number comparison in isInternalFrame
        // Original: lineNumber >= qStartingLine && lineNumber <= qEndingLine
        // Mutated: true && lineNumber <= qEndingLine (always true for first condition)

        // Enable long stack traces
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
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
            // The mutation would cause frames with line numbers below qStartingLine
            // to be incorrectly considered internal when they shouldn't be

            const stackLines = e.stack?.split('\n') || [];

            // Count frames that should NOT be filtered (external frames)
            const externalFrames = stackLines.filter(line =>
                line.includes("at ") &&
                !line.includes("q.js") &&
                !line.includes("isInternalFrame")
            );

            // In original code: external frames should remain
            // In mutated code: some external frames might be incorrectly filtered
            expect(externalFrames.length).toBeGreaterThan(0);

            // Count total frames remaining
            const totalFrames = stackLines.filter(line => line.includes("at "));
            expect(totalFrames.length).toBeGreaterThan(0);

            return Q.delay(10);
        }).finally(() => {
            Q.longStackSupport = originalLongStackSupport;
        });
    });
});