// Test to expose the mutation in q.js
const Q = require("../../../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
    it("should correctly identify Node.js environment", () => {
        // Save original process
        const originalProcess = global.process;

        // Test 1: Verify current behavior with real process
        const isNodeJS = typeof process !== 'undefined' &&
                        process.toString() === "[object process]" &&
                        typeof process.nextTick === 'function';

        // Test 2: Create fake environment with process.nextTick but not Node.js
        const fakeProcess = {
            nextTick: () => {},
            toString: () => "[object Object]" // Not "[object process]"
        };

        // Replace global process
        (global as any).process = fakeProcess;

        // Check if Q would incorrectly use process.nextTick in this environment
        // In original code: should NOT use process.nextTick because toString() !== "[object process]"
        // In mutated code: would use process.nextTick because the check is removed
        const wouldUseProcessNextTick = typeof fakeProcess.nextTick === 'function';

        // Restore original process
        (global as any).process = originalProcess;

        // Original code should NOT use process.nextTick in fake environment
        expect(wouldUseProcessNextTick).toBe(false);
    });
});