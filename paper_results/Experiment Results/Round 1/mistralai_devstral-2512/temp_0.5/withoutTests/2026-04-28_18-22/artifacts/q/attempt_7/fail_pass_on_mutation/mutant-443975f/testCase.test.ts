const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library async scheduling behavior", () => {
    it("should demonstrate different scheduling behavior between original and mutated code", (done) => {
        // This test creates a scenario where the scheduling mechanism choice affects observable behavior
        // By creating many small promises, we can detect differences in how they're scheduled

        const results: number[] = [];
        const startTime = Date.now();

        // Create a chain of promises that should reveal scheduling differences
        let promise = Q.resolve(0);

        for (let i = 1; i <= 50; i++) {
            promise = promise.then((value) => {
                results.push(Date.now() - startTime);
                return value + 1;
            });
        }

        promise.then((finalValue) => {
            // Calculate statistics about the timing
            const avgTime = results.reduce((sum, time) => sum + time, 0) / results.length;
            const maxTime = Math.max(...results);
            const minTime = Math.min(...results);

            // The original code using setImmediate should show different timing characteristics
            // than the mutated code falling back to setTimeout
            // This is a behavioral difference we can observe

            // These thresholds are designed to fail on the mutated version
            // where setImmediate is disabled and setTimeout is used instead
            expect(avgTime).toBeLessThan(5); // setImmediate is faster
            expect(maxTime - minTime).toBeLessThan(10); // More consistent timing with setImmediate

            done();
        }).done();
    }, 10000);
});