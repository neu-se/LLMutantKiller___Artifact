const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library setImmediate detection", () => {
    it("should fail when setImmediate check is disabled", (done) => {
        // This test verifies that the mutation (changing `typeof setImmediate === "function"` to `false`)
        // actually affects the behavior by checking if setImmediate is being used for scheduling

        // We'll use a more direct approach by checking the actual scheduling mechanism
        // used by examining the promise execution order and timing

        const executionTimes: number[] = [];
        const startTime = Date.now();

        // Create a chain of promises that should reveal the scheduling mechanism
        let chain = Q.resolve();
        for (let i = 0; i < 10; i++) {
            chain = chain.then(() => {
                executionTimes.push(Date.now() - startTime);
            });
        }

        chain.then(() => {
            // Calculate the average time between promise executions
            const avgTime = executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length;

            // In the original code with setImmediate:
            // - Execution should be very fast (setImmediate has higher priority)
            // - Average time should be very low

            // In the mutated code (falling back to setTimeout):
            // - Execution will be slower
            // - Average time will be higher

            // This threshold is designed to pass on original but fail on mutated
            expect(avgTime).toBeLessThan(2);

            done();
        }).done();
    });
});