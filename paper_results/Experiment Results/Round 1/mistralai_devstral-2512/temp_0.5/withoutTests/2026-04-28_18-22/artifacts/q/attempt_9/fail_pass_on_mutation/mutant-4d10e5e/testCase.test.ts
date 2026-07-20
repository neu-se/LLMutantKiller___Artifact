// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-4d10e5e/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library stack trace behavior", () => {
    it("should not capture stack traces when creating rejected promises", () => {
        // Create a rejected promise with long stack support enabled
        Q.longStackSupport = true;

        const error = new Error("Test error");
        const promise = Q.reject(error);

        // Force the promise to be inspected to trigger stack capture logic
        const inspection = promise.inspect();

        // In original code (hasStacks = false), stack won't be captured
        // In mutated code (hasStacks = true), stack will be captured
        // Check if the promise has stack information
        const hasStack = (promise as any).stack !== undefined;
        expect(hasStack).toBe(false);
    });
});