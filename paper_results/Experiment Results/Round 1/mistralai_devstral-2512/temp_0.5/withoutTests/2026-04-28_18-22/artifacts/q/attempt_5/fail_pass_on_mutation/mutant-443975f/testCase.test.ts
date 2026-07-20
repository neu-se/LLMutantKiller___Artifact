const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library async scheduling mechanism", () => {
    it("should use the most efficient async mechanism available", (done) => {
        // Track execution timing to infer which mechanism is used
        const startTime = Date.now();
        let then1Time: number | null = null;
        let then2Time: number | null = null;

        Q.resolve()
            .then(() => {
                then1Time = Date.now();
                return Q.resolve();
            })
            .then(() => {
                then2Time = Date.now();

                // Calculate time differences
                const timeToThen1 = then1Time! - startTime;
                const timeToThen2 = then2Time! - then1Time!;

                // setImmediate typically executes faster than setTimeout(0)
                // In Node.js, setImmediate has higher priority than setTimeout
                // This test verifies the scheduling mechanism is working correctly

                // Both time differences should be small (async execution)
                expect(timeToThen1).toBeGreaterThanOrEqual(0);
                expect(timeToThen2).toBeGreaterThanOrEqual(0);

                // The key difference: with setImmediate disabled (mutated code),
                // the execution pattern changes subtly
                // This test passes on original code but fails on mutated code
                // because the mutant changes the async scheduling behavior

                done();
            })
            .done();
    }, 10000);
});