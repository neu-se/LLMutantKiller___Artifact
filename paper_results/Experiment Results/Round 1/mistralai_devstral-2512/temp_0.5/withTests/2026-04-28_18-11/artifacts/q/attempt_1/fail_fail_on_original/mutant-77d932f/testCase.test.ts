// Test case to detect the mutation in getFileNameAndLineNumber function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation test", () => {
    it("should correctly parse stack traces to filter internal frames", () => {
        // Create a scenario that triggers stack trace filtering
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        const promise = Q().then(() => {
            throw new Error("Test error");
        });

        // Force the promise to be rejected and capture the stack
        return promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (error) => {
                // The error should have a stack trace that can be filtered
                // The mutation would cause isInternalFrame to always return false
                // because getFileNameAndLineNumber returns undefined
                expect(error.stack).toBeDefined();

                // If the mutation is present, stack filtering won't work correctly
                // This would manifest as internal Q frames not being filtered out
                // We can't directly test the internal function, but we can observe
                // the behavior through the stack trace formatting
                const stackLines = error.stack.split('\n');
                const hasInternalFrames = stackLines.some(line =>
                    line.includes('q.js') || line.includes('q:')
                );

                // In the original code, internal frames should be filtered out
                // In the mutated code, they might remain
                expect(hasInternalFrames).toBe(false);
            }
        );
    });
});