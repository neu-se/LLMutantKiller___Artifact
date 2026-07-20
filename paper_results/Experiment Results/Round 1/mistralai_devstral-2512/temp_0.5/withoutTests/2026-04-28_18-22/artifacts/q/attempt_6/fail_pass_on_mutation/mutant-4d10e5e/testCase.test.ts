// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-4d10e5e/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library stack trace behavior", () => {
    it("should not capture stack traces in promise rejection when hasStacks is false", () => {
        // Create a promise that will be rejected
        const deferred = Q.defer();
        const error = new Error("Test error");

        // Reject the promise
        deferred.reject(error);

        // Get the promise's internal stack property
        const promise = deferred.promise;
        const stackProperty = (promise as any).stack;

        // In the original code (hasStacks = false), stack should be undefined
        // In the mutated code (hasStacks = true), stack will be defined
        expect(stackProperty).toBeUndefined();
    });
});