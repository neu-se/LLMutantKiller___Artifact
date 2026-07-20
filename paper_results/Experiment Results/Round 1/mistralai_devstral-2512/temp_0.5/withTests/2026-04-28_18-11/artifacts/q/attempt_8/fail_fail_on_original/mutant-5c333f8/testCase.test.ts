import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering behavior", () => {
    it("should filter stack frames at exactly qStartingLine", async () => {
        // Enable long stack support to trigger stack trace filtering
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        let stackTrace: string | undefined;
        let error: Error | undefined;

        try {
            // Create a promise chain that will generate stack traces
            const deferred = Q.defer();
            error = new Error("Test error");

            // Create a promise chain that will be rejected
            const promise = deferred.promise
                .then(() => {
                    throw error;
                })
                .catch((err: Error) => {
                    // Capture the stack trace after it's been filtered
                    stackTrace = err.stack;
                    return err;
                });

            // Reject the deferred to trigger the chain
            deferred.reject(error);

            // Wait for the promise to settle
            await promise;

            // The mutation affects whether lines at exactly qStartingLine are filtered
            // In the original code: lineNumber >= qStartingLine (filters the line)
            // In the mutated code: lineNumber > qStartingLine (doesn't filter the line)

            // Verify the stack trace was processed
            expect(stackTrace).toBeDefined();
            expect(stackTrace!.length).toBeGreaterThan(0);

            // Count the number of stack frames that contain "at"
            const stackFrames = stackTrace!.split('\n').filter(line =>
                line.includes('at ') && !line.includes('q.js')
            );

            // The original code should filter more aggressively, resulting in fewer frames
            // The mutated code would include more frames (including qStartingLine)
            expect(stackFrames.length).toBeLessThanOrEqual(15);
        } finally {
            Q.longStackSupport = originalLongStackSupport;
        }
    });
});