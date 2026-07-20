import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick implementation detection", () => {
    it("should use MessageChannel when available for performance", (done) => {
        // This test only makes sense in environments with MessageChannel
        if (typeof MessageChannel === "undefined") {
            done();
            return;
        }

        const iterations = 1000;
        let counter = 0;
        const startTime = Date.now();

        function task() {
            counter++;
            if (counter === iterations) {
                const duration = Date.now() - startTime;

                // With MessageChannel, 1000 iterations should complete in under 100ms
                // With setTimeout fallback, it would take significantly longer
                // The mutation forces setTimeout usage, making this test fail
                expect(duration).toBeLessThan(100);

                done();
            }
        }

        // Schedule all tasks
        for (let i = 0; i < iterations; i++) {
            Q.nextTick(task);
        }
    });
});