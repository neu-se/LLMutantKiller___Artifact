// Test to detect the mutation in the Q library's nextTick implementation
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior with setImmediate", () => {
    it("should properly schedule tasks when setImmediate is available", (done) => {
        // Store original setImmediate if it exists
        const originalSetImmediate = global.setImmediate;
        let executionOrder: string[] = [];

        // Mock setImmediate to track execution order
        global.setImmediate = function(callback: () => void) {
            executionOrder.push("setImmediate");
            process.nextTick(() => {
                executionOrder.push("callback");
                callback();
            });
        };

        try {
            executionOrder.push("start");
            Q.resolve().then(() => {
                executionOrder.push("promise");
            });

            // Use setTimeout to check the execution order after some time
            setTimeout(() => {
                // Restore original setImmediate
                global.setImmediate = originalSetImmediate;

                // In the original code with setImmediate available:
                // 1. "start" is pushed
                // 2. "setImmediate" is pushed when Q schedules the task
                // 3. "callback" is pushed when the scheduled task runs
                // 4. "promise" is pushed when the promise resolves
                // In the mutated code, setImmediate won't be used, so the order will be different
                expect(executionOrder).toEqual(["start", "setImmediate", "callback", "promise"]);
                done();
            }, 100);
        } catch (error) {
            // Restore original setImmediate in case of error
            global.setImmediate = originalSetImmediate;
            done(error);
        }
    });
});