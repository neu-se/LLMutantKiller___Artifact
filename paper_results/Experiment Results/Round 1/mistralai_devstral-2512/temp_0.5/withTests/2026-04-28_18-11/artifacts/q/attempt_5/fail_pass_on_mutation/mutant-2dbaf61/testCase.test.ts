const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace handling", () => {
    it("should properly capture and format stack traces in rejected promises", () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        const deferred = Q.defer();
        const error = new Error("Test rejection");

        // Capture the promise before rejection
        const promise = deferred.promise;

        // Reject the promise
        deferred.reject(error);

        // Check the promise's stack property
        return promise.then(
            () => {
                fail("Promise should have been rejected");
            },
            (caughtError: any) => {
                // In original code, the promise should have a stack property
                // In mutated code, hasStacks would be false, preventing stack capture
                if (caughtError.stack) {
                    expect(typeof caughtError.stack).toBe("string");
                    expect(caughtError.stack.length).toBeGreaterThan(0);
                } else {
                    fail("Stack trace should be available on rejected promise");
                }
            }
        );
    });
});