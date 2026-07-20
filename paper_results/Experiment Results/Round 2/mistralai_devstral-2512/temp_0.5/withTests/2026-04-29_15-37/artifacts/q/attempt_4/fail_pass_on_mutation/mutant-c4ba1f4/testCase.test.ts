// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-c4ba1f4/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick setImmediate fallback", () => {
    it("should use setImmediate when available for proper async scheduling", () => {
        // This test verifies that Q.nextTick properly schedules tasks
        // by checking that multiple tasks execute in the correct order
        const results: number[] = [];

        return new Promise<void>((resolve, reject) => {
            // Schedule multiple tasks to verify the queue works
            Q.nextTick(() => {
                results.push(1);
                Q.nextTick(() => {
                    results.push(3);
                    if (results.join(',') !== '1,2,3') {
                        reject(new Error(`Unexpected order: ${results.join(',')}`));
                    } else {
                        resolve();
                    }
                });
            });

            Q.nextTick(() => {
                results.push(2);
            });
        });
    });
});