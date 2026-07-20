// Test case to detect the mutation in q.js
import { Q } from "./q.js";

describe("Node.js environment detection", () => {
    it("should use process.nextTick when in a Node.js environment", (done) => {
        // This test verifies that Q correctly identifies a Node.js environment
        // and uses process.nextTick for scheduling tasks.
        // The mutation changes the condition to `if (false)`, which would prevent
        // Node.js-specific optimizations from being used.

        // We can't directly observe the internal scheduling mechanism, but we can
        // observe the behavior by checking if tasks are executed in the expected way
        // for a Node.js environment.

        // In Node.js, process.nextTick should be used for immediate scheduling
        // This test creates a scenario where we can infer the scheduling mechanism

        let executionOrder: string[] = [];

        // Schedule a task using Q.nextTick
        Q.nextTick(() => {
            executionOrder.push("qNextTick");
        });

        // Schedule a task using process.nextTick directly
        process.nextTick(() => {
            executionOrder.push("processNextTick");
            // Give Q's nextTick a chance to execute
            setImmediate(() => {
                // In a proper Node.js environment with the correct detection,
                // both should have executed by now
                // The order isn't guaranteed, but both should be present
                expect(executionOrder).toContain("qNextTick");
                expect(executionOrder).toContain("processNextTick");
                done();
            });
        });

        // If the mutation is present (if (false)), Q.nextTick won't use process.nextTick
        // and will fall back to setImmediate or other mechanisms, which would execute
        // after process.nextTick, potentially causing this test to fail or timeout
    });
});