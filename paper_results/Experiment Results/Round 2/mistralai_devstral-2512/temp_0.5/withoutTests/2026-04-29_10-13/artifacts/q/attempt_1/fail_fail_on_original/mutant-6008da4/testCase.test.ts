import { Q } from "./q.js";

describe("Q library behavior", () => {
    it("should correctly identify Node.js environment for process.nextTick", (done) => {
        // This test checks if Q correctly identifies the environment
        // The mutation changes isNodeJS from false to true, which affects
        // how nextTick is implemented (using process.nextTick vs alternatives)

        // In the original code, isNodeJS should be false in browser-like environments
        // In the mutated code, isNodeJS is always true

        // We can detect this by checking if Q.nextTick uses process.nextTick
        // when it shouldn't (in non-Node environments)
        const originalProcess = global.process;

        // Simulate a non-Node environment by removing process.nextTick
        delete global.process;

        // Create a spy to detect if process.nextTick is called
        const nextTickSpy = jest.fn();
        global.process = { nextTick: nextTickSpy };

        // Force Q to re-evaluate the environment
        const Q2 = require("./q.js");

        // Schedule a task
        let taskExecuted = false;
        Q2.nextTick(() => {
            taskExecuted = true;
        });

        // In the original code, since isNodeJS should be false in this environment,
        // it should not use process.nextTick. In the mutated code, it will try to use
        // process.nextTick even when it shouldn't exist.

        // Give time for the task to execute
        setTimeout(() => {
            // Restore original process
            global.process = originalProcess;

            // In original code: task should execute via fallback (setTimeout)
            // In mutated code: it would try to use process.nextTick which doesn't exist properly
            expect(taskExecuted).toBe(true);

            // The key difference: in mutated code, it would have tried to use process.nextTick
            // even in non-Node environment, which could cause issues
            done();
        }, 10);
    });
});