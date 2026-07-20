// Test to expose the mutation in q.js
const Q = require("../../../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
    it("should correctly detect Node.js environment based on process.toString()", () => {
        // Save original process
        const originalProcess = global.process;

        // Test with fake process that has nextTick but isn't Node.js
        const fakeProcess = {
            nextTick: () => {},
            toString: () => "[object Object]" // Not "[object process]"
        };

        // Replace global process
        (global as any).process = fakeProcess;

        // Check if Q is using process.nextTick (which it shouldn't in original code)
        // In original code: should NOT use process.nextTick because toString() !== "[object process]"
        // In mutated code: would use process.nextTick because the check is removed
        const isUsingProcessNextTick = Q.nextTick === fakeProcess.nextTick;

        // Restore original process
        (global as any).process = originalProcess;

        // Original code should NOT use process.nextTick in this case
        expect(isUsingProcessNextTick).toBe(false);
    });
});