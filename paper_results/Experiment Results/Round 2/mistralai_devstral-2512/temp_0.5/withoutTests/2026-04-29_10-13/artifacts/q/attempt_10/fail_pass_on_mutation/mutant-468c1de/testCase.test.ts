// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_10/pending_category/mutant-468c1de/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise stack trace filtering", () => {
    it("should properly filter stack traces based on stack counter comparison", async () => {
        // Get the Q object from the module
        const Q = (qModule as any).default || qModule;

        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a promise chain with multiple levels to generate stack frames
        const error = new Error("Original error");
        const promise1 = Q.reject(error);
        const promise2 = promise1.then(() => {
            return Q.delay(1).then(() => {
                throw new Error("Chained error");
            });
        });

        // Wait for the promise to settle and capture the stack
        let capturedStack: string | undefined;
        await promise2.then(null, (e: Error) => {
            capturedStack = e.stack;
        });

        // Verify the stack was captured
        expect(capturedStack).toBeDefined();

        // The mutation changes the condition from checking stack counters to always true
        // This would cause ALL stack frames to be included, making the stack much longer
        // than in the original version which filters based on counter comparison

        // Count the total number of stack frames
        const stackLines = capturedStack!.split('\n').length;

        // In the original code, the stack should be filtered to remove internal frames
        // We expect a reasonable number of frames (not too many)
        // In the mutated code, ALL frames would be included making it much longer
        // Using a higher threshold that should pass on original but fail on mutated
        expect(stackLines).toBeLessThan(30);

        // Also verify the stack contains our error message
        expect(capturedStack).toContain("Original error");
    });
});