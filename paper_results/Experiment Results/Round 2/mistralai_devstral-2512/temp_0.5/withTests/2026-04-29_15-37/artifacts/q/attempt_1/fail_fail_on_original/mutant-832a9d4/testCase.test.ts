import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("MessageChannel nextTick implementation", () => {
    it("should execute tasks in the correct order with MessageChannel", (done) => {
        const results: number[] = [];
        let firstTaskCompleted = false;

        // Schedule a task that should complete first
        Q.nextTick(() => {
            results.push(1);
            firstTaskCompleted = true;
        });

        // Schedule a task that should complete second
        Q.nextTick(() => {
            results.push(2);
            // In the original implementation with MessageChannel, this should be true
            // In the mutated implementation falling back to setTimeout, this might be false
            if (firstTaskCompleted) {
                expect(results).toEqual([1, 2]);
                done();
            } else {
                // If we get here, the mutation is present
                done(new Error("Tasks executed out of order - MessageChannel implementation missing"));
            }
        });
    });
});