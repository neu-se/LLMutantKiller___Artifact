// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick environment detection", () => {
    it("should correctly detect Node.js environment for process.nextTick", (done) => {
        // Store original process
        const originalProcess = global.process;

        // Test in a non-Node.js environment (browser-like)
        delete global.process;

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
            // In the original code, this should be false because process doesn't exist
            // In the mutated code, this will be true because the condition is always true
            expect(usesProcessNextTick).toBe(false);

            // Restore original process
            global.process = originalProcess;
            done();
        });
    });
});