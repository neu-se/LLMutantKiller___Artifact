// Test case to detect the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
    it("should filter internal Q frames from stack traces", () => {
        // Create a promise chain that will generate internal stack frames
        const error = new Error("Test error");
        const promise = Q.reject(error);

        return promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (err: Error) => {
                const stack = err.stack;
                expect(stack).toBeDefined();

                // Check for specific internal Q functions in the stack trace
                const hasInternalQFrames = stack && (
                    stack.includes("isInternalFrame") ||
                    stack.includes("filterStackString") ||
                    stack.includes("makeStackTraceLong") ||
                    stack.includes("getFileNameAndLineNumber")
                );

                // In the original code, internal Q frames should be filtered out
                // In the mutated code, all frames are kept (return true && ...)
                // So the mutated version will include these internal function names
                expect(hasInternalQFrames).toBe(false);

                // Also verify the stack contains our test error
                expect(stack).toContain("Test error");
                return Q.resolve(undefined);
            }
        );
    });
});