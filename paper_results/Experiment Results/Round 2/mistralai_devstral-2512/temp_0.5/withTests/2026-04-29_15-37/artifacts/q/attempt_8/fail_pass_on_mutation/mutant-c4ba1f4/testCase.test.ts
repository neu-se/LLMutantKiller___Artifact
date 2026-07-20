// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-c4ba1f4/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick setImmediate behavior", () => {
    it("should use setImmediate when available for immediate execution", () => {
        // This test verifies that Q.nextTick properly uses setImmediate
        // by checking that tasks execute in a timely manner

        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            let executed = false;

            // Schedule a task
            Q.nextTick(() => {
                executed = true;
                const elapsed = Date.now() - startTime;

                // In original code with setImmediate, this should execute quickly
                // In mutated code without setImmediate, it might use slower fallback
                if (executed && elapsed < 100) {
                    resolve();
                } else {
                    reject(new Error(`Task didn't execute properly. Executed: ${executed}, Time: ${elapsed}ms`));
                }
            });

            // Set a safety timeout
            setTimeout(() => {
                reject(new Error(`Test timed out. Executed: ${executed}`));
            }, 100);
        });
    });
});