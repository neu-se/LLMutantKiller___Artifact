// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation detection", () => {
    it("should correctly filter internal stack frames", async () => {
        // Create a scenario where stack traces are generated and filtered
        // The mutation causes all stack lines to be considered internal
        // which would incorrectly filter out all frames

        // Force long stack traces to be enabled
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        try {
            // Create a chain of promises that will generate stack traces
            const error = new Error("Test error");
            const promise = Q.reject(error);

            // Add some depth to the promise chain to generate more stack frames
            const chainedPromise = promise
                .then(() => { throw error; })
                .then(() => { throw error; })
                .then(() => { throw error; });

            await chainedPromise
                .catch((e) => {
                    // Check that the stack trace contains expected frames
                    // The mutation would cause all frames to be filtered out
                    expect(e.stack).toBeDefined();
                    expect(e.stack.length).toBeGreaterThan(0);

                    // The stack should contain more than just the error message
                    // If the mutation is present, the stack might be empty or just contain the error
                    const stackLines = e.stack.split('\n');
                    expect(stackLines.length).toBeGreaterThan(1);

                    // At least one line should not be filtered (not contain "q.js")
                    const hasNonInternalFrame = stackLines.some(line =>
                        line.includes('.js') && !line.includes('q.js')
                    );
                    expect(hasNonInternalFrame).toBe(true);
                });
        } finally {
            // Restore original setting
            Q.longStackSupport = originalLongStackSupport;
        }
    });
});