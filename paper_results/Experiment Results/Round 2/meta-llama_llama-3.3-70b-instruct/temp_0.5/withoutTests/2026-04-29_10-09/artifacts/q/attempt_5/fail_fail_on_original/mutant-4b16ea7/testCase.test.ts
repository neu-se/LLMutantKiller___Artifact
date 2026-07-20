import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should use setImmediate when available", () => {
        // Mock the setImmediate function to test its availability
        const originalSetImmediate = global.setImmediate;
        const setImmediateMock = jest.fn();
        global.setImmediate = setImmediateMock;

        // Create a new instance of Q
        const nextTick = q.nextTick;

        // Check if the nextTick function is called with the flush function
        nextTick(() => {});

        // Check if setImmediate was called
        if (typeof global.setImmediate === 'function') {
            expect(setImmediateMock).toHaveBeenCalledTimes(1);
        } else {
            expect(true).toBe(false);
        }

        // Restore the original setImmediate function
        global.setImmediate = originalSetImmediate;
    });
});