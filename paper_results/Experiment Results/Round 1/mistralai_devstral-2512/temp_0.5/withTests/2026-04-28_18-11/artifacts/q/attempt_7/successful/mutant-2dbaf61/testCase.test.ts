const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
    it("should filter internal stack frames when long stack support is enabled", () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a promise chain that generates multiple stack frames
        const error = new Error("Test error");
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();

        // Chain promises to create multiple stack frames
        deferred1.promise.then(() => {
            return deferred2.promise;
        });

        // Reject the second promise
        deferred2.reject(error);

        return deferred2.promise.then(
            () => {
                fail("Should have been rejected");
            },
            (caughtError: any) => {
                // Check if stack filtering worked
                if (caughtError.stack) {
                    // Count how many "From previous event" separators we have
                    // This indicates proper stack chaining
                    const stack = caughtError.stack;
                    const separatorCount = (stack.match(/From previous event/g) || []).length;

                    // With proper stack detection (original code), we should have separators
                    // With broken detection (mutated code), we might not
                    expect(separatorCount).toBeGreaterThan(0);
                } else {
                    fail("Stack trace should be available");
                }
            }
        );
    });
});