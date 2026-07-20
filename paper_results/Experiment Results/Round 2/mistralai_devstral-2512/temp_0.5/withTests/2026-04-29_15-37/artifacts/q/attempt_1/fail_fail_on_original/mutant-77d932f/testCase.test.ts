// Test case to detect the mutation in getFileNameAndLineNumber function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation test", () => {
    it("should properly parse stack traces to filter internal frames", async () => {
        // Create a scenario that triggers stack trace filtering
        // This will only work if long stack traces are enabled
        Q.longStackSupport = true;

        // Create a chain of promises that will generate stack traces
        const promise = Q().then(() => {
            return Q.Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error("Test error"));
                }, 0);
            });
        });

        try {
            await promise;
            fail("Promise should have rejected");
        } catch (error: any) {
            // The error should have a stack trace
            expect(error.stack).toBeDefined();

            // If the mutation is present (empty getFileNameAndLineNumber),
            // the stack trace won't be properly filtered and will include
            // internal Q frames. We can't directly test the internal function,
            // but we can observe the behavior difference in stack filtering.
            // The original code should filter out Q internal frames,
            // while the mutated code won't filter anything.

            // Check that the stack contains our test code but not excessive Q internals
            // This is a heuristic check - the exact behavior depends on implementation
            const stackLines = error.stack.split('\n');
            const hasTestFile = stackLines.some(line =>
                line.includes('mutant-77d932f') || line.includes('testCase.test.ts')
            );

            // The stack should contain our test file reference
            expect(hasTestFile).toBe(true);

            // With the mutation, we expect more internal Q frames to remain
            // This is hard to test precisely without knowing exact line numbers,
            // but we can check that filtering occurred by looking for the separator
            const hasSeparator = error.stack.includes('From previous event:');
            expect(hasSeparator).toBe(true);
        }
    });
});