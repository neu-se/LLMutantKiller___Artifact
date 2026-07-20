import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick performance characteristics", () => {
    it("should execute tasks immediately when using MessageChannel", (done) => {
        if (typeof MessageChannel === "undefined") {
            done();
            return;
        }

        const startTime = performance.now();
        let executionTimes: number[] = [];

        function task() {
            const currentTime = performance.now();
            executionTimes.push(currentTime - startTime);

            if (executionTimes.length === 10) {
                // Calculate the maximum time between consecutive tasks
                const maxGap = executionTimes.slice(1).reduce((max, time, i) => {
                    const gap = time - executionTimes[i];
                    return Math.max(max, gap);
                }, 0);

                // With MessageChannel, the maximum gap should be very small (< 2ms)
                // With setTimeout, there would be consistent ~4ms+ gaps
                // The mutation forces setTimeout usage, making this test fail
                expect(maxGap).toBeLessThan(2);

                done();
            }
        }

        // Schedule tasks
        for (let i = 0; i < 10; i++) {
            Q.nextTick(task);
        }
    });
});