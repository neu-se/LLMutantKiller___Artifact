const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace detection", () => {
    it("should properly detect stack trace support during initialization", () => {
        // The mutation affects the initial stack detection code
        // We can test this by checking if Q properly handles stack traces
        // in its internal operations

        // Create a promise chain that should generate internal stack frames
        const error = new Error("Test error");
        const deferred = Q.defer();

        // The key is that the original code should properly detect stack support
        // and filter internal frames, while the mutated code would not
        deferred.reject(error);

        return deferred.promise.then(
            () => {
                fail("Should have been rejected");
            },
            (caughtError: any) => {
                // Check if the stack was properly processed
                if (caughtError.stack) {
                    // In original code, internal Q frames should be filtered
                    // In mutated code, this filtering wouldn't work properly
                    const stackLines = caughtError.stack.split('\n');
                    let hasQFrames = false;

                    // Check if any stack lines contain Q internal references
                    for (const line of stackLines) {
                        if (line.includes('q.js') || line.includes('From previous event')) {
                            hasQFrames = true;
                            break;
                        }
                    }

                    // The original code should have properly processed stacks
                    // The mutated code would behave differently
                    expect(hasQFrames).toBe(true);
                } else {
                    fail("Stack trace should be available");
                }
            }
        );
    });
});