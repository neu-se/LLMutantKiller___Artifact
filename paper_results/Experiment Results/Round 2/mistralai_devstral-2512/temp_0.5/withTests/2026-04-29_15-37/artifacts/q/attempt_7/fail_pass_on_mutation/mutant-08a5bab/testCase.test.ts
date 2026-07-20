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

                // Check for the presence of specific Q internal functions in the stack
                const hasInternalFrames = stack && (
                    stack.includes("isInternalFrame") ||
                    stack.includes("filterStackString") ||
                    stack.includes("makeStackTraceLong") ||
                    stack.includes("getFileNameAndLineNumber")
                );

                // In the original code, internal Q frames should be filtered out
                // In the mutated code, all frames are kept (return true && ...)
                // So the mutated version will include these internal function names
                expect(hasInternalFrames).toBe(false);
                return Q.resolve(undefined);
            }
        );
    });
});