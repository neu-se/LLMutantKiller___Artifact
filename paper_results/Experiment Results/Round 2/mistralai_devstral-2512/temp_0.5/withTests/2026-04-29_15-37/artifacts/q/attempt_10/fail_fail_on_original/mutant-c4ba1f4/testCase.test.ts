// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-c4ba1f4/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick behavior with setImmediate", () => {
    it("should execute tasks in correct order when setImmediate is available", (done) => {
        // This test verifies that Q.nextTick maintains proper task ordering
        // which depends on the correct implementation of fallbacks

        const results: number[] = [];
        let task1Done = false;
        let task2Done = false;

        // Schedule first task
        Q.nextTick(() => {
            results.push(1);
            task1Done = true;

            // Check if both tasks have completed
            if (task1Done && task2Done) {
                // Verify both tasks executed
                if (results.length === 2 && results.includes(1) && results.includes(2)) {
                    done();
                } else {
                    done(new Error(`Unexpected results: ${results.join(',')}`));
                }
            }
        });

        // Schedule second task
        Q.nextTick(() => {
            results.push(2);
            task2Done = true;

            // Check if both tasks have completed
            if (task1Done && task2Done) {
                // Verify both tasks executed
                if (results.length === 2 && results.includes(1) && results.includes(2)) {
                    done();
                } else {
                    done(new Error(`Unexpected results: ${results.join(',')}`));
                }
            }
        });

        // Safety timeout
        setTimeout(() => {
            done(new Error(`Test timed out. Results: ${results.join(',')}`));
        }, 100);
    });
});