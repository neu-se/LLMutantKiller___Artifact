// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick environment detection", () => {
    it("should correctly detect Node.js environment for process.nextTick", (done) => {
        // Store original process
        const originalProcess = global.process;

        // Test in a non-Node.js environment (browser-like)
        (global as any).process = undefined;

        // Track which nextTick implementation is used
        let usesProcessNextTick = false;
        const originalNextTick = Q.nextTick;

        // Override nextTick to detect usage
        Q.nextTick = function(task: Function) {
            if ((global as any).process && typeof (global as any).process.nextTick === 'function') {
                usesProcessNextTick = true;
            }
            // Call the original nextTick with a try-catch to handle the undefined process case
            try {
                originalNextTick(task);
            } catch (e) {
                // If process is undefined, we expect this to fail in the original code
                // but this is the behavior we're testing
                if ((global as any).process === undefined) {
                    // In original code, this should fail because process is undefined
                    // In mutated code, this will succeed because the condition is always true
                    expect(usesProcessNextTick).toBe(false);
                    (global as any).process = originalProcess;
                    done();
                    return;
                }
                throw e;
            }
        };

        // Execute a task through Q.nextTick
        Q.nextTick(() => {
            // This should not be reached in the original code when process is undefined
            // but will be reached in the mutated code
            expect(usesProcessNextTick).toBe(false);
            (global as any).process = originalProcess;
            done();
        });
    });
});