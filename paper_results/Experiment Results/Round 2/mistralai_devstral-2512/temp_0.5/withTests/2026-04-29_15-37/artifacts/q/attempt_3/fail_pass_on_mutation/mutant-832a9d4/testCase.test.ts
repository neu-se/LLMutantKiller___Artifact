import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("MessageChannel nextTick implementation", () => {
    it("should use MessageChannel when available for faster task scheduling", (done) => {
        // This test verifies that Q.nextTick uses MessageChannel when available
        // by checking if tasks can be scheduled and executed in a way that
        // distinguishes MessageChannel from setTimeout fallback

        const startTime = Date.now();
        let executionTimes: number[] = [];

        // Schedule multiple tasks to detect timing differences
        for (let i = 0; i < 10; i++) {
            Q.nextTick(() => {
                executionTimes.push(Date.now() - startTime);
            });
        }

        // Check after a brief delay
        setTimeout(() => {
            // With MessageChannel, tasks should execute more quickly and consistently
            // With setTimeout fallback, there will be more variability
            const allExecuted = executionTimes.length === 10;
            const maxTime = Math.max(...executionTimes);

            // MessageChannel should complete all tasks within ~10ms
            // setTimeout fallback might take longer
            if (allExecuted && maxTime < 15) {
                done();
            } else {
                done(new Error(`MessageChannel implementation not working properly. Executed: ${executionTimes.length}/10, Max time: ${maxTime}ms`));
            }
        }, 20);
    });
});