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

            // We need to verify the stack trace was processed by checking it exists
            expect(stackTrace).toBeDefined();
            expect(stackTrace!.length).toBeGreaterThan(0);

            // The key difference is that the original code filters more aggressively
            // than the mutated code, which should result in different stack trace lengths
            // when the starting line is part of the trace

            // We'll check that the stack trace doesn't contain the qStartingLine
            // by looking for specific patterns that would indicate filtering worked
            const hasInternalFrames = stackTrace!.includes("q.js");
            expect(hasInternalFrames).toBe(false);

            // Additional check: verify the stack trace doesn't contain the exact line number
            // This is more likely to fail on the mutated version
            const lines = stackTrace!.split('\n');
            const hasLineNumber = lines.some(line => line.includes('q.js') && line.includes(':'));
            expect(hasLineNumber).toBe(false);

            // Final check: verify the stack trace length is reasonable
            // The original code should produce shorter stack traces
            expect(stackTrace!.length).toBeLessThan(1000);
        } finally {
            Q.longStackSupport = originalLongStackSupport;
        }
    });
});