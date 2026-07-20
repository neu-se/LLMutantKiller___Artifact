// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-c4ba1f4/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick with setImmediate", () => {
    it("should execute tasks asynchronously using setImmediate when available", (done) => {
        // This test verifies that Q.nextTick uses setImmediate when available
        // by checking that tasks are executed asynchronously
        let executionOrder: number[] = [];

        // Schedule a task with Q.nextTick
        Q.nextTick(() => {
            executionOrder.push(2);
            // Check that the order is correct (sync code first, then nextTick)
            expect(executionOrder).toEqual([1, 2]);
            done();
        });

        // This should execute first (synchronously)
        executionOrder.push(1);

        // If setImmediate is broken (due to the mutation), this test might:
        // 1. Hang (if no fallback is properly used)
        // 2. Execute in wrong order (if fallback has different timing)
        // 3. Fail the assertion
    });
});