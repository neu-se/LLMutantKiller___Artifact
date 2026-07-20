import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
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

            // Count the number of stack frames that contain "at" and "q.js"
            const qFrames = stackTrace!.split('\n').filter(line =>
                line.includes('at ') && line.includes('q.js')
            );

            // The original code should filter out qStartingLine, resulting in fewer q.js frames
            // The mutated code would include qStartingLine, resulting in more q.js frames
            // This test expects the original behavior (fewer frames)
            expect(qFrames.length).toBe(0);
        } finally {
            Q.longStackSupport = originalLongStackSupport;
        }
    });
});