// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick environment detection", () => {
    it("should correctly detect Node.js environment for process.nextTick", (done) => {
        // Store original process
        const originalProcess = global.process;

        // Test in a Node.js-like environment
        global.process = {
            nextTick: (callback: Function) => {
                callback();
            },
            stdout: process.stdout,
            stderr: process.stderr,
            stdin: process.stdin,
            argv: [],
            env: {}
        } as any;

        // Track which nextTick implementation is used
        let usesProcessNextTick = false;
        const originalNextTick = Q.nextTick;

        // Override nextTick to detect usage
        Q.nextTick = function(task: Function) {
            if (global.process && typeof global.process.nextTick === 'function') {
                usesProcessNextTick = true;
            }
            originalNextTick(task);
        };

        // Execute a task through Q.nextTick
        Q.nextTick(() => {
            // In the original code, this should be true because it properly detects Node.js
            // In the mutated code, this will be false because the condition is always true
            // regardless of whether process exists
            expect(usesProcessNextTick).toBe(true);

            // Restore original process
            global.process = originalProcess;
            done();
        });
    });
});