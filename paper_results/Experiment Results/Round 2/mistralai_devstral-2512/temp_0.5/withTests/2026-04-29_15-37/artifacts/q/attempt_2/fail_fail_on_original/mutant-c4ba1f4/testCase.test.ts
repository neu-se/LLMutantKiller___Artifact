// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-c4ba1f4/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick setImmediate fallback", () => {
    it("should properly use setImmediate when available", (done) => {
        // Track execution order to verify async behavior
        const executionOrder: number[] = [];

        // Schedule a task with Q.nextTick
        Q.nextTick(() => {
            executionOrder.push(2);

            // Verify execution order (sync first, then async)
            if (executionOrder[0] !== 1 || executionOrder[1] !== 2) {
                done(new Error(`Unexpected execution order: ${executionOrder}`));
                return;
            }

            // Schedule another task to verify the queue works
            Q.nextTick(() => {
                executionOrder.push(3);
                if (executionOrder[2] !== 3) {
                    done(new Error(`Unexpected execution order: ${executionOrder}`));
                    return;
                }
                done();
            });
        });

        // This executes synchronously first
        executionOrder.push(1);
    }).timeout(1000); // Add timeout to prevent hanging
});