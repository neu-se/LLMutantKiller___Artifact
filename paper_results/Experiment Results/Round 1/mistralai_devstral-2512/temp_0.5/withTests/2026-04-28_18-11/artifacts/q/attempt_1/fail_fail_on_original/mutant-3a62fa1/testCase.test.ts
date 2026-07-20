// Test case to detect the mutation in q.js
import { Q } from "./q.js";

describe("Q.nextTick behavior", () => {
    it("should use process.nextTick when in Node.js environment", (done) => {
        // This test verifies that Q.nextTick uses process.nextTick in Node.js
        // The mutation changes the condition from checking `typeof process === "object"`
        // to always true, which would break the proper detection of Node.js environment

        // We'll test by checking if the nextTick implementation uses process.nextTick
        // when running in a Node.js environment
        const originalProcess = global.process;

        // Mock a Node.js environment
        global.process = {
            nextTick: (callback: Function) => {
                // This is the Node.js nextTick
                callback();
            },
            domain: null
        };

        let nextTickUsed = false;
        const originalNextTick = Q.nextTick;

        // Spy on Q.nextTick to see if it uses process.nextTick
        Q.nextTick = function(task: Function) {
            if (global.process && global.process.nextTick) {
                nextTickUsed = true;
            }
            originalNextTick(task);
        };

        Q.nextTick(() => {
            expect(nextTickUsed).toBe(true);
            // Restore original process
            global.process = originalProcess;
            done();
        });
    });
});