const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace behavior", () => {
    it("should not modify error stacks when hasStacks is false", () => {
        const error = new Error("Test error");
        const originalStack = error.stack;

        const deferred = Q.defer();
        deferred.reject(error);

        return deferred.promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (e: Error) => {
                // In original code (hasStacks=false), stack should remain unchanged
                // In mutated code (hasStacks=true), stack would be modified with Q's internal frames
                // We check that the stack doesn't contain Q's internal markers
                expect(e.stack).toBe(originalStack);
                expect(e.stack).not.toMatch(/From previous event/);
            }
        );
    });
});