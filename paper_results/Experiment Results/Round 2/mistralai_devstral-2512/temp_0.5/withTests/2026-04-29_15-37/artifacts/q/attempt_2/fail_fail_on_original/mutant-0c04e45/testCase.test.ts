import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with SpiderMonkey generators", () => {
    it("should properly handle generator results when StopIteration is defined", () => {
        // This test targets the mutation where the try-catch block in the
        // SpiderMonkey generator handling was emptied, which would prevent
        // proper handling of generator results
        const originalStopIteration = typeof StopIteration !== 'undefined' ? StopIteration : undefined;

        try {
            // Simulate SpiderMonkey environment by defining StopIteration
            const StopIteration = function(value) {
                this.value = value;
            };
            StopIteration.prototype = new Error();

            // Create a generator function that uses the old SpiderMonkey style
            const makeGenerator = function() {
                let state = 0;
                return {
                    next: function(arg) {
                        switch (state) {
                            case 0:
                                state++;
                                return Q(42);
                            case 1:
                                state++;
                                throw new StopIteration(arg + 1);
                            default:
                                throw new Error("Generator completed");
                        }
                    },
                    throw: function(e) {
                        throw e;
                    }
                };
            };

            return Q.async(makeGenerator)().then((result) => {
                expect(result).toBe(43);
            });
        } finally {
            // Restore original StopIteration if it existed
            if (originalStopIteration === undefined && typeof StopIteration !== 'undefined') {
                delete global.StopIteration;
            } else if (originalStopIteration !== undefined) {
                global.StopIteration = originalStopIteration;
            }
        }
    });
});