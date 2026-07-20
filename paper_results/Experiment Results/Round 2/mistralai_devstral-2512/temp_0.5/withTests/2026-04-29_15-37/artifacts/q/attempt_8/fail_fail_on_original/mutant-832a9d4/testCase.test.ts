import Q from "../../../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick implementation detection", () => {
    it("should detect MessageChannel usage through task execution pattern", (done) => {
        const executionTimes: number[] = [];
        const totalTasks = 5;

        // Schedule tasks with precise timing measurement
        function scheduleTask(n: number) {
            const start = performance.now();
            Q.nextTick(() => {
                const end = performance.now();
                executionTimes.push(end - start);

                if (n < totalTasks - 1) {
                    scheduleTask(n + 1);
                } else {
                    // Analyze execution pattern
                    const avgTime = executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length;
                    const allFast = executionTimes.every(t => t < 10);

                    // MessageChannel should have very fast (<10ms) and consistent timing
                    // setTimeout fallback will be slower and more variable
                    if (allFast && avgTime < 5) {
                        done();
                    } else {
                        done(new Error(`Task execution pattern suggests MessageChannel not used: avg ${avgTime}ms`));
                    }
                }
            });
        }

        scheduleTask(0);

        // Safety timeout
        setTimeout(() => {
            done(new Error(`Test timed out - completed ${executionTimes.length} tasks`));
        }, 500);
    });
});