// Test case to detect the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
    it("should correctly identify internal stack frames", () => {
        // Create a promise chain that will generate stack frames
        const error = new Error("Test error");
        const promise = Q.reject(error);

        return promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (err: Error) => {
                const stack = err.stack;
                expect(stack).toBeDefined();

                // The mutation changes isInternalFrame to always return true
                // This means it should keep all frames including internal ones
                // We check for the presence of the q.js file in the stack
                const hasQFileReference = stack && stack.includes("q.js");

                // In the original code, internal frames are filtered out
                // In the mutated code, all frames are kept (return true && ...)
                // So the test should fail on mutated code because it will include q.js
                expect(hasQFileReference).toBe(false);
                return Q.resolve(undefined);
            }
        );
    });
});