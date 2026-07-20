// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
    it("should filter internal Q frames from stack traces", () => {
        // Create a scenario that generates a stack trace with internal Q frames
        const error = new Error("Test error");
        const promise = Q.reject(error);

        return promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (err) => {
                // The stack trace should not contain internal Q frames
                const stack = err.stack;
                expect(stack).toBeDefined();

                // Check that the stack trace does not contain references to internal Q functions
                // This is a heuristic check since the exact stack trace format varies by environment
                const hasInternalFrames = stack && (
                    stack.includes("q.js") ||
                    stack.includes("isInternalFrame") ||
                    stack.includes("filterStackString")
                );

                // In the original code, internal frames should be filtered out
                // In the mutated code, all frames are kept (return true && ...)
                expect(hasInternalFrames).toBe(false);
                return Q.resolve();
            }
        );
    });
});