// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_4/pending_category/mutant-468c1de/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise stack trace filtering", () => {
    it("should properly filter stack traces based on stack counter comparison", async () => {
        // Get the Q object from the module
        const Q = (qModule as any).default || qModule;

        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a promise chain that will generate multiple stack frames
        const error = new Error("Original error");
        const promise1 = Q.reject(error);
        const promise2 = promise1.then(() => {
            throw new Error("Chained error");
        });

        // Wait for the promise to settle and capture the stack
        let capturedStack: string | undefined;
        await promise2.then(null, (e: Error) => {
            capturedStack = e.stack;
        });

        // Verify the stack was captured
        expect(capturedStack).toBeDefined();

        // The mutation changes the condition from checking stack counters to always true
        // This would cause more stack frames to be included than intended
        // We can verify this by checking that the stack contains the expected error message
        expect(capturedStack).toContain("Original error");

        // Count the number of stack frames
        const stackLines = capturedStack!.split('\n').length;

        // In the original code, the stack should be filtered to remove internal Q frames
        // The mutation would include more frames, making the stack longer
        // We expect at least the error message line and some context, but not too many frames
        expect(stackLines).toBeGreaterThan(1);
        expect(stackLines).toBeLessThan(20);
    });
});