const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace behavior", () => {
    it("should not modify error stacks when hasStacks is false", () => {
        const originalError = new Error("Original error");
        const originalStack = originalError.stack;

        const deferred = Q.defer();
        deferred.reject(originalError);

        return deferred.promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (e: Error) => {
                // In original code (hasStacks=false), stack should remain unchanged
                // In mutated code (hasStacks=true), stack would be modified with Q's internal frames
                expect(e.stack).toBe(originalStack);
            }
        );
    });
});