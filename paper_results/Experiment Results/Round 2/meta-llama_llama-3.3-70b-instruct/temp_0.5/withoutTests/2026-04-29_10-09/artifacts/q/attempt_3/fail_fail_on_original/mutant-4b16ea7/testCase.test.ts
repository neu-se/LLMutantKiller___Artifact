import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should use setImmediate when available", () => {
        // Mock the setImmediate function to test its availability
        const originalSetImmediate = global.setImmediate;
        global.setImmediate = jest.fn();

        // Create a new instance of Q
        const nextTick = q.nextTick;

        // Check if the nextTick function is called with the flush function
        nextTick(() => {});

        // Check if setImmediate was called
        expect(global.setImmediate).toHaveBeenCalledTimes(1);

        // Restore the original setImmediate function
        global.setImmediate = originalSetImmediate;
    });
});