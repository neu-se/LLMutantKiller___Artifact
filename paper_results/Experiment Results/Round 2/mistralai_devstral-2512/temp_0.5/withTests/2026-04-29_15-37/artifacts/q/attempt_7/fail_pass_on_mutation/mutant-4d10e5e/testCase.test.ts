const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace behavior", () => {
    it("should not include Q internal stack frames when hasStacks is false", () => {
        // Create a promise chain that would trigger stack trace modification
        const error = new Error("Test error");
        let originalStack = error.stack;

        // Create a deferred that rejects with our error
        const deferred = Q.defer();
        deferred.reject(error);

        // Chain some operations to create stack frames
        return deferred.promise
            .then(() => {
                throw new Error("Should not reach here");
            })
            .catch((e: Error) => {
                // In original code (hasStacks=false), stack should remain unchanged
                // In mutated code (hasStacks=true), stack would be modified with Q's internal frames
                // Check that the stack doesn't contain Q's internal markers
                expect(e.stack).toBe(originalStack);
                expect(e.stack).not.toMatch(/From previous event/);
                expect(e.stack).not.toContain("q.js");
                return e;
            });
    });
});