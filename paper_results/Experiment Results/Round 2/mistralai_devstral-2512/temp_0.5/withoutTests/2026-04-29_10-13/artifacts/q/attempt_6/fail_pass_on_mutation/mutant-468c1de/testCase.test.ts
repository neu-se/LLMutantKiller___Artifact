// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_6/pending_category/mutant-468c1de/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise stack trace filtering", () => {
    it("should properly filter stack traces based on stack counter comparison", async () => {
        // Get the Q object from the module
        const Q = (qModule as any).default || qModule;

        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a complex promise chain to generate multiple stack frames
        const error = new Error("Test error");
        const promise1 = Q.reject(error);
        const promise2 = promise1.then(() => {
            return Q.delay(1).then(() => {
                throw new Error("Delayed error");
            });
        });

        // Wait for the promise to settle and capture the stack
        let capturedStack: string | undefined;
        await promise2.then(null, (e: Error) => {
            capturedStack = e.stack;
        });

        // Verify the stack was captured
        expect(capturedStack).toBeDefined();

        // Count occurrences of specific internal Q frames that should be filtered
        const internalFrameCount = (capturedStack!.match(/at.*q\.js/g) || []).length;

        // In the original code, internal frames should be filtered out
        // The mutation (always true condition) would include more internal frames
        // We expect the original to have fewer internal frames than the mutated version
        expect(internalFrameCount).toBeLessThanOrEqual(5);

        // Also verify the stack contains our test error
        expect(capturedStack).toContain("Test error");
    });
});