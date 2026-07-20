// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-4d10e5e/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library stack trace behavior", () => {
    it("should not capture stack traces when hasStacks is false", () => {
        // The mutation changes hasStacks from false to true
        // We need to test behavior that depends on this flag
        // The key is that when hasStacks is false, stack traces shouldn't be captured

        // Create a rejected promise with an error
        const error = new Error("Test error");
        const promise = Q.reject(error);

        // Inspect the promise to see its state
        const result = promise.inspect();

        // In the original code (hasStacks = false), the stack should not be captured
        // In the mutated code (hasStacks = true), the stack will be captured
        // We check that the stack property doesn't exist on the error
        expect(result.state).toBe("rejected");
        expect(result.reason).toBe(error);
        expect((result.reason as any).stack).toBeUndefined();
    });
});