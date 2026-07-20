// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-4d10e5e/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library stack trace behavior", () => {
    it("should not modify error stack when hasStacks is false", () => {
        // Create an error with a known stack trace
        const originalError = new Error("Test error");
        const originalStack = originalError.stack;

        // Create a rejected promise with this error
        const promise = Q.reject(originalError);

        // Get the rejected reason from the promise
        return promise.then(
            () => { throw new Error("Should not be called"); },
            (reason) => {
                // In the original code (hasStacks = false), the stack should remain unchanged
                // In the mutated code (hasStacks = true), the stack might be modified
                expect(reason).toBe(originalError);
                expect(reason.stack).toBe(originalStack);
            }
        );
    });
});