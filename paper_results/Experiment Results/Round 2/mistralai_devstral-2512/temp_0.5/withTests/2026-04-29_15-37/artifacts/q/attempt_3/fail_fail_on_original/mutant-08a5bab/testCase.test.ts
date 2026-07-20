// Test case to detect the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
    it("should correctly identify and filter internal Q frames", () => {
        // Enable long stack traces to ensure stack filtering is active
        Q.longStackSupport = true;

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

                // The mutation changes the isInternalFrame function to always return true
                // This means it should NOT filter any frames in the mutated version
                // We check for the presence of Q's internal file name in the stack
                const containsQFile = stack && stack.includes("q.js");

                // In the original code, internal Q frames should be filtered out
                // In the mutated code, all frames are kept (return true && ...)
                // So the mutated version will include q.js in the stack trace
                expect(containsQFile).toBe(false);
                return Q.resolve();
            }
        );
    });
});