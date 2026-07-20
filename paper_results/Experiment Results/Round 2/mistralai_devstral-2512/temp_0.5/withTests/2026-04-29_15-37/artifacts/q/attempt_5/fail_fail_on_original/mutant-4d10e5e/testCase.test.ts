const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace behavior", () => {
    it("should not include Q internal frames in stack when hasStacks is false", () => {
        // Enable long stack traces to trigger the mutation effect
        Q.longStackSupport = true;

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
                // In mutated code (hasStacks=true), stack would include Q internal frames
                expect(e.stack).toBe(originalStack);
                expect(e.stack).not.toContain("q.js");
            }
        );
    });
});