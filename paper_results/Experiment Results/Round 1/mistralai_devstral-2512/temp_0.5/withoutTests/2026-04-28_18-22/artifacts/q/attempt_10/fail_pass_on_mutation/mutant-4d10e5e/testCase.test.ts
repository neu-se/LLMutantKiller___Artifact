// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-4d10e5e/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library stack trace behavior", () => {
    it("should not modify error stack property when hasStacks is false", () => {
        // Create an error and capture its original stack
        const error = new Error("Test error");
        const originalStack = error.stack;

        // Create a deferred promise and reject it with our error
        const deferred = Q.defer();
        deferred.reject(error);

        // Get the promise and check if stack was modified
        const promise = deferred.promise;
        const result = promise.inspect();

        // In original code (hasStacks = false), stack should remain unchanged
        // In mutated code (hasStacks = true), stack might be modified
        expect(result.reason).toBe(error);
        expect(error.stack).toBe(originalStack);
    });
});