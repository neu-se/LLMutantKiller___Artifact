// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-4d10e5e/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library long stack traces", () => {
    it("should not create long stack traces when hasStacks is false", () => {
        // Enable long stack support to test the behavior
        Q.longStackSupport = true;

        // Create a chain of promises that will be rejected
        const error = new Error("Test error");
        const promise1 = Q.reject(error);
        const promise2 = promise1.then(() => {});

        // Force promise resolution
        return promise2.then(
            () => { throw new Error("Should not be called"); },
            (reason) => {
                // In original code (hasStacks = false), long stacks won't work
                // In mutated code (hasStacks = true), long stacks will work
                // Check if the error has the long stack marker
                const hasLongStack = (reason as any).__minimumStackCounter__ !== undefined;
                expect(hasLongStack).toBe(false);
            }
        );
    });
});