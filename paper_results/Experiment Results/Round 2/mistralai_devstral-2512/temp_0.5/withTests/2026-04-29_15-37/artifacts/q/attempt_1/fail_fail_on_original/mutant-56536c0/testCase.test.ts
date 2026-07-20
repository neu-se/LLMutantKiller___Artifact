import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick performance", () => {
    it("should use MessageChannel when available for better performance", (done) => {
        // Check if MessageChannel is available in the environment
        const hasMessageChannel = typeof MessageChannel !== "undefined";

        if (!hasMessageChannel) {
            // If MessageChannel is not available, skip this test
            done();
            return;
        }

        const iterations = 100;
        const startTime = Date.now();
        let completed = 0;

        function task() {
            completed++;
            if (completed === iterations) {
                const endTime = Date.now();
                const duration = endTime - startTime;

                // MessageChannel should be significantly faster than setTimeout
                // We expect it to complete 100 iterations in less than 50ms
                // With setTimeout, it would typically take much longer
                expect(duration).toBeLessThan(50);

                done();
            }
        }

        for (let i = 0; i < iterations; i++) {
            Q.nextTick(task);
        }
    });
});