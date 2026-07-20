import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("MessageChannel nextTick implementation", () => {
    it("should use MessageChannel when available for task scheduling", (done) => {
        // Test that verifies the specific behavior of MessageChannel vs setTimeout
        const startTime = performance.now();
        let taskCount = 0;
        const totalTasks = 100;

        function scheduleTask() {
            if (taskCount >= totalTasks) {
                const endTime = performance.now();
                const duration = endTime - startTime;

                // With MessageChannel, 100 tasks should complete in under 50ms
                // With setTimeout fallback, it will take significantly longer
                if (duration < 50) {
                    done();
                } else {
                    done(new Error(`Tasks took too long (${duration}ms) - MessageChannel not being used`));
                }
                return;
            }

            Q.nextTick(() => {
                taskCount++;
                scheduleTask();
            });
        }

        scheduleTask();

        // Safety timeout
        setTimeout(() => {
            done(new Error(`Test timed out - only ${taskCount} tasks completed`));
        }, 200);
    });
});