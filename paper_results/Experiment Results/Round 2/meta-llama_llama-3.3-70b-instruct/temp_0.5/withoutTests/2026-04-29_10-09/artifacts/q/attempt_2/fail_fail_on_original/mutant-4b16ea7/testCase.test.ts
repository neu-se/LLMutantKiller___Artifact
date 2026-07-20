import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should use setImmediate when available", () => {
        // Mock the setImmediate function to test its availability
        const originalSetImmediate = global.setImmediate;
        global.setImmediate = jest.fn();

        // Create a new instance of Q
        const q = (Q as any)();

        // Check if the nextTick function is called with the flush function
        const nextTick = q.nextTick;
        nextTick(() => {});

        // Check if setImmediate was called
        expect(global.setImmediate).toHaveBeenCalledTimes(1);

        // Restore the original setImmediate function
        global.setImmediate = originalSetImmediate;
    });
});