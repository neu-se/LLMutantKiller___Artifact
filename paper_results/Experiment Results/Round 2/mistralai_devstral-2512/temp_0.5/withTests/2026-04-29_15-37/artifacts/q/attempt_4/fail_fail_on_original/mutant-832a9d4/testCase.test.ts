import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("MessageChannel nextTick implementation", () => {
    it("should properly handle rapid successive nextTick calls", (done) => {
        const executionOrder: number[] = [];
        const totalTasks = 50;

        // Create a chain of nextTick calls
        function createTask(n: number) {
            if (n >= totalTasks) {
                // Verify all tasks executed in order
                expect(executionOrder.length).toBe(totalTasks);
                for (let i = 0; i < totalTasks; i++) {
                    expect(executionOrder[i]).toBe(i);
                }
                done();
                return;
            }

            Q.nextTick(() => {
                executionOrder.push(n);
                createTask(n + 1);
            });
        }

        // Start the chain
        createTask(0);

        // Set a timeout to fail the test if it takes too long
        setTimeout(() => {
            done(new Error(`Test timed out - only ${executionOrder.length} tasks completed`));
        }, 1000);
    });
});