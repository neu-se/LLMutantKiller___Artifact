// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-c4ba1f4/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick behavior verification", () => {
    it("should execute all scheduled tasks", (done) => {
        const results: number[] = [];
        let completed = 0;

        // Schedule multiple tasks
        Q.nextTick(() => {
            results.push(1);
            if (++completed === 2 && results.length === 2) {
                // Verify both tasks executed
                if (results.includes(1) && results.includes(2)) {
                    done();
                } else {
                    done(new Error(`Not all tasks executed. Got: ${results.join(',')}`));
                }
            }
        });

        Q.nextTick(() => {
            results.push(2);
            if (++completed === 2 && results.length === 2) {
                // Verify both tasks executed
                if (results.includes(1) && results.includes(2)) {
                    done();
                } else {
                    done(new Error(`Not all tasks executed. Got: ${results.join(',')}`));
                }
            }
        });

        // Safety timeout
        setTimeout(() => {
            done(new Error(`Test timed out. Only executed: ${results.join(',')}`));
        }, 100);
    });
});