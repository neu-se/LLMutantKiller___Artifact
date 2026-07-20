// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-c4ba1f4/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick scheduling behavior", () => {
    it("should schedule tasks correctly when setImmediate is available", (done) => {
        // Track execution order
        const order: string[] = [];

        // In environments with setImmediate (like Node.js), the original code
        // will use it for scheduling, while the mutated code will skip to
        // MessageChannel or setTimeout, potentially causing different behavior

        // Schedule multiple tasks
        Q.nextTick(() => {
            order.push('task1');
            if (order.join(',') === 'sync,task1,task2') {
                done();
            } else {
                done(new Error(`Unexpected order: ${order.join(',')}`));
            }
        });

        Q.nextTick(() => {
            order.push('task2');
        });

        // This should execute first (synchronously)
        order.push('sync');

        // Set a safety timeout
        setTimeout(() => {
            done(new Error(`Test timed out. Order was: ${order.join(',')}`));
        }, 100);
    });
});