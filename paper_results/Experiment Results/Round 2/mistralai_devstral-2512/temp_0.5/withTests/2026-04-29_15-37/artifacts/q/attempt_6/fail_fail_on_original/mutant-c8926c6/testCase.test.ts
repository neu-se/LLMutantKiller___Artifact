// Test to expose the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
    it("should correctly detect Node.js environment based on process.toString()", () => {
        // Save original process
        const originalProcess = global.process;

        // Test 1: Real Node.js environment (should use process.nextTick)
        if (typeof process !== 'undefined' && process.toString() === "[object process]") {
            expect(Q.nextTick).toBe(process.nextTick);
        }

        // Test 2: Fake environment with process.nextTick but not Node.js
        const fakeProcess = {
            nextTick: () => {},
            toString: () => "[object Object]" // Not "[object process]"
        };

        // Replace global process
        (global as any).process = fakeProcess;

        // In original code: should NOT use process.nextTick because toString() !== "[object process]"
        // In mutated code: would use process.nextTick because the check is removed
        expect(Q.nextTick).not.toBe(fakeProcess.nextTick);

        // Restore original process
        (global as any).process = originalProcess;
    });
});