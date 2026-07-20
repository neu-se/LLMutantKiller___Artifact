import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick implementation behavior", () => {
    it("should execute tasks with minimal delay when MessageChannel is available", (done) => {
        // This test only runs in environments with MessageChannel support
        if (typeof MessageChannel === "undefined") {
            done();
            return;
        }

        const startTime = Date.now();
        let counter = 0;
        const totalTasks = 100;

        function task() {
            counter++;
            if (counter === totalTasks) {
                const duration = Date.now() - startTime;

                // With MessageChannel, 100 tasks should complete in under 50ms
                // With setTimeout fallback, it would take significantly longer (100+ms)
                // The mutation forces setTimeout usage, making this test fail
                expect(duration).toBeLessThan(50);

                done();
            }
        }

        // Schedule all tasks
        for (let i = 0; i < totalTasks; i++) {
            Q.nextTick(task);
        }
    });
});