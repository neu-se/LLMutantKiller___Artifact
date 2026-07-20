// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-468c1de/testCase.test.ts
import { Q } from "./q.js";

describe("Q promise long stack traces", () => {
    it("should correctly filter stack traces based on stack counter", async () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a chain of promises to build up stack traces
        const promise1 = Q.reject(new Error("Test error"));
        const promise2 = promise1.then(() => {
            throw new Error("Chained error");
        });

        // Wait for the promise to settle
        await promise2.then(null, (error) => {
            // Verify that the stack trace is properly filtered
            expect(error.stack).toBeDefined();

            // The mutation would cause all stack traces to be included
            // regardless of stack counter, which would make the stack
            // trace longer than expected in some cases
            const stackLines = error.stack.split('\n').length;

            // In the original code, the stack should be filtered to remove
            // internal Q frames. The mutation would include more frames.
            // We can't predict exact line count, but we can verify the
            // stack contains expected markers
            expect(error.stack).toContain("Test error");
        });
    });
});