import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library behavior", () => {
    it("should correctly identify Node.js environment for process.nextTick", (done) => {
        // Save original process
        const originalProcess = global.process;

        // Simulate a non-Node environment
        global.process = undefined;

        // Force Q to re-evaluate the environment
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