// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-4d10e5e/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library stack trace behavior", () => {
    it("should not have stack property on rejected promise when hasStacks is false", () => {
        // Create a rejected promise
        const error = new Error("Test error");
        const promise = Q.reject(error);

        // In the original code (hasStacks = false), the promise should not have a stack property
        // In the mutated code (hasStacks = true), the promise will have a stack property
        expect((promise as any).stack).toBeUndefined();
    });
});