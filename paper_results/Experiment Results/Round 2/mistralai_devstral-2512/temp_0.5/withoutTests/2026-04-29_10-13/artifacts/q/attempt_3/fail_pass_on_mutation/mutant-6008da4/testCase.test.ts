import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library behavior", () => {
    it("should correctly identify Node.js environment for process.nextTick", (done) => {
        // This test checks if Q correctly identifies the environment
        // The mutation changes isNodeJS from false to true, which affects
        // how nextTick is implemented (using process.nextTick vs alternatives)

        // We can detect this by checking if Q.nextTick behaves correctly
        // in a non-Node environment (where process.nextTick shouldn't be used)

        // Save original process
        const originalProcess = global.process;

        // Simulate a non-Node environment by removing process.nextTick
        if (global.process) {
            const { nextTick, ...rest } = global.process;
            global.process = rest as any;
        }

        // Force Q to re-evaluate the environment
        // We need to re-import Q to get the fresh evaluation
        jest.isolateModules(() => {
            const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");

            // Schedule a task
            let taskExecuted = false;
            Q2.nextTick(() => {
                taskExecuted = true;
            });

            // In the original code, since isNodeJS should be false in this environment,
            // it should use fallback (setTimeout). In the mutated code, it will try to use
            // process.nextTick which doesn't exist.

            // Give time for the task to execute
            setTimeout(() => {
                // Restore original process
                global.process = originalProcess;

                // In original code: task should execute via fallback (setTimeout)
                // In mutated code: it would fail because process.nextTick doesn't exist
                expect(taskExecuted).toBe(true);
                done();
            }, 10);
        });
    });
});