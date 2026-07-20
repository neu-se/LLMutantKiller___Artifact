import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator result handling", () => {
    it("should properly handle generator results in SpiderMonkey-style generators", () => {
        // This test targets the mutation where the try-catch block in the
        // SpiderMonkey generator handling was emptied, which would prevent
        // proper handling of generator results
        const originalStopIteration = typeof StopIteration !== 'undefined' ? StopIteration : undefined;

        try {
            // Simulate SpiderMonkey environment by defining StopIteration
            const StopIteration = function(value: any) {
                this.value = value;
            } as any;
            StopIteration.prototype = Object.create(Error.prototype);

            // Create a generator that returns a value using StopIteration
            const makeGenerator = function() {
                return {
                    next: function() {
                        const error = new StopIteration(42);
                        error.value = 42;
                        throw error;
                    },
                    throw: function(e: any) {
                        throw e;
                    }
                };
            };

            return Q.async(makeGenerator)().then((result: number) => {
                expect(result).toBe(42);
            });
        } finally {
            // Restore original StopIteration if it existed
            if (originalStopIteration === undefined && typeof (global as any).StopIteration !== 'undefined') {
                delete (global as any).StopIteration;
            } else if (originalStopIteration !== undefined) {
                (global as any).StopIteration = originalStopIteration;
            }
        }
    });
});