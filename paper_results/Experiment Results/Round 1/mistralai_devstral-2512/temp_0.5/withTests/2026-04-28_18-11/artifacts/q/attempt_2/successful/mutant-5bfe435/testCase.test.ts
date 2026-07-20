// Test case to detect the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Node.js environment detection", () => {
    it("should correctly identify Node.js environment and use process.nextTick", (done) => {
        // This test verifies that Q correctly identifies a Node.js environment
        // The mutation changes the Node.js detection condition from checking process.nextTick
        // to always false, which would prevent Node.js optimizations

        // We'll test by checking if Q.nextTick behaves like process.nextTick
        // in a Node.js environment

        const results: number[] = [];

        // Use Q.nextTick to schedule a task
        Q.nextTick(() => {
            results.push(1);
        });

        // Use process.nextTick directly
        process.nextTick(() => {
            results.push(2);

            // In the original code, both should execute in the same event loop phase
            // With the mutation, Q.nextTick would use a different mechanism
            // and might execute in a different order or timing
            expect(results.length).toBe(2);

            // Both should have executed by now in original code
            // The mutation would likely cause different behavior
            done();
        });

        // If the mutation is present, Q.nextTick won't use process.nextTick
        // and will use a fallback mechanism, causing different execution timing
        // which would make the test fail
    });
});