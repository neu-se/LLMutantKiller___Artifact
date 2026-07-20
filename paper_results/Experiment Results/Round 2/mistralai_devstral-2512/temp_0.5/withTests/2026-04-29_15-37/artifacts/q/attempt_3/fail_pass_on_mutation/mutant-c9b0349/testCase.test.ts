import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
    it("should correctly filter stack frames based on line numbers", () => {
        // Enable long stack traces to trigger the isInternalFrame function
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        // Create a promise that will be rejected with a stack trace
        const deferred = Q.defer();
        let capturedStack: string | undefined;

        // Create a deep promise chain to generate stack frames
        Q().then(() => {
            return Q().then(() => {
                return Q().then(() => {
                    try {
                        throw new Error("Test error");
                    } catch (e: any) {
                        capturedStack = e.stack;
                        deferred.reject(e);
                    }
                });
            });
        });

        return deferred.promise.catch((e: Error) => {
            // The original code should filter internal frames but keep external ones
            // The mutated code (with "true &&") would filter ALL frames
            const stackLines = e.stack?.split('\n') || [];

            // Count how many frames remain after filtering
            // In the original code, some frames should remain
            // In the mutated code, all frames might be filtered out
            const remainingFrames = stackLines.filter(line =>
                line.includes("at ") && !line.includes("(q.js")
            );

            // This assertion should fail in the mutated version because
            // all frames would be incorrectly filtered out
            expect(remainingFrames.length).toBeGreaterThan(0);

            return Q.delay(10);
        }).finally(() => {
            Q.longStackSupport = originalLongStackSupport;
        });
    });
});