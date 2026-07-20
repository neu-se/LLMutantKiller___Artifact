import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator exception handling", () => {
    it("should properly handle exceptions in SpiderMonkey-style generators", () => {
        // This test targets the mutation where the try-catch block was emptied
        // in the SpiderMonkey generator handling code
        const originalStopIteration = typeof StopIteration !== 'undefined' ? StopIteration : undefined;

        try {
            // Simulate SpiderMonkey environment
            const StopIteration = function(value: any) {
                if (new.target) {
                    this.value = value;
                } else {
                    return new (StopIteration as any)(value);
                }
            } as any;
            StopIteration.prototype = Object.create(Error.prototype);
            StopIteration.prototype.constructor = StopIteration;

            // Create a generator that throws an exception
            const makeGenerator = function() {
                return {
                    next: function() {
                        throw new Error("Test exception");
                    },
                    throw: function(e: any) {
                        throw e;
                    }
                };
            };

            return Q.async(makeGenerator)()
                .then(() => {
                    throw new Error("Should not resolve");
                })
                .catch((error: Error) => {
                    expect(error.message).toBe("Test exception");
                });
        } finally {
            // Clean up
            if (originalStopIteration === undefined && typeof (global as any).StopIteration !== 'undefined') {
                delete (global as any).StopIteration;
            } else if (originalStopIteration !== undefined) {
                (global as any).StopIteration = originalStopIteration;
            }
        }
    });
});