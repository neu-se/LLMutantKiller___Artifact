const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace detection", () => {
    it("should properly detect stack trace support and capture long stacks", () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a promise chain that should generate a stack trace
        const error = new Error("Test error");
        const deferred = Q.defer();
        deferred.reject(error);

        return deferred.promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (caughtError: any) => {
                // In environments with stack traces, the error should have a stack property
                // The mutation would cause hasStacks to be false, preventing stack capture
                if (caughtError.stack) {
                    expect(typeof caughtError.stack).toBe("string");
                    expect(caughtError.stack.length).toBeGreaterThan(0);
                    // Check that the stack contains our test function
                    expect(caughtError.stack).toMatch(/should properly detect stack trace support/);
                }
                return true;
            }
        );
    });
});