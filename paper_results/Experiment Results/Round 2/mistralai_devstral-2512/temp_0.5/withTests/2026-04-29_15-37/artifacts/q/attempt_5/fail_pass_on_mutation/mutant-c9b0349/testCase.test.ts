import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
    it("should correctly filter internal stack frames based on line numbers", () => {
        // Enable long stack traces to trigger stack filtering
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        const deferred = Q.defer();
        let capturedError: Error;

        // Create a deep promise chain to generate multiple stack frames
        Q().then(() => {
            return Q().then(() => {
                return Q().then(() => {
                    try {
                        throw new Error("Test error");
                    } catch (e) {
                        capturedError = e as Error;
                        deferred.reject(e);
                    }
                });
            });
        });

        return deferred.promise.catch((e: Error) => {
            // The original code should preserve external stack frames
            // The mutated code (with "true &&") would filter ALL frames

            const stackLines = e.stack?.split('\n') || [];

            // Count non-Q frames (external frames)
            const externalFrames = stackLines.filter(line =>
                line.includes("at ") &&
                !line.includes("q.js") &&
                !line.includes("isInternalFrame")
            );

            // This assertion should fail in the mutated version because
            // all frames would be incorrectly filtered out
            expect(externalFrames.length).toBeGreaterThan(0);

            // Also verify we have some frames remaining
            expect(stackLines.length).toBeGreaterThan(1);

            return Q.delay(10);
        }).finally(() => {
            Q.longStackSupport = originalLongStackSupport;
        });
    });
});