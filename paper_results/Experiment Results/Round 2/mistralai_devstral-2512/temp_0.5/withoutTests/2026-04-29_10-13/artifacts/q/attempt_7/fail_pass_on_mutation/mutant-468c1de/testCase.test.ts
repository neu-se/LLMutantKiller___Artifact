// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_7/pending_category/mutant-468c1de/testCase.test.ts
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

        // The mutation changes the condition from:
        // if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter))
        // to:
        // if (p.stack && (true))
        //
        // This means the mutated version will include ALL stack frames regardless of counter
        // while the original version filters based on counter comparison

        // Count how many times "From previous event" appears in the stack
        // This separator is added when concatenating stacks from previous promises
        const separatorCount = (capturedStack!.match(/From previous event/g) || []).length;

        // In the original code, only relevant stacks should be included (fewer separators)
        // In the mutated code, ALL stacks would be included (more separators)
        expect(separatorCount).toBeLessThan(3);

        // Also verify the stack contains our error message
        expect(capturedStack).toContain("Original error");
    });
});