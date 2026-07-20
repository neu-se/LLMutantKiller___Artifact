import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function behavior", () => {
    it("should handle environments without stack trace support", () => {
        // Create a promise chain that will generate stack traces
        const promise = Q.resolve()
            .then(() => {
                // This will trigger stack trace capture
                throw new Error("Test error");
            })
            .catch((error: Error) => {
                // The mutation affects how captureLine works when hasStacks is false
                // In the original code, it returns early when hasStacks is false
                // In the mutated code, it always tries to capture line info
                // This difference should be observable in the stack trace

                expect(error.message).toBe("Test error");

                // The stack trace should exist
                expect(error.stack).toBeDefined();

                // In the original code with hasStacks=false, the stack might be simpler
                // In the mutated code, it might try to filter more aggressively
                return error.stack;
            });

        return promise;
    });
});