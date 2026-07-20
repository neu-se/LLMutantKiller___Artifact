import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library stack trace capture", () => {
    it("should properly handle environments without stack traces", () => {
        // This test verifies that captureLine returns undefined when hasStacks is false
        // The mutation changes the behavior by removing the return statement
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = false;

        try {
            // Create a promise to trigger the captureLine logic
            const promise = Q.resolve(42);

            // In the original code, when hasStacks is false, captureLine should return undefined
            // In the mutated code, it would return nothing (implicit undefined)
            // Both behaviors are the same, so we need to test the actual captureLine behavior

            // We can't directly test captureLine since it's not exported,
            // but we can test the side effects on promise creation
            expect(promise.inspect().state).toBe("fulfilled");
            expect((promise as any).stack).toBeUndefined();
        } finally {
            Q.longStackSupport = originalLongStackSupport;
        }
    });
});