import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick", () => {
    it("should use setImmediate if available", () => {
        // Create a mock for setImmediate
        const originalSetImmediate = global.setImmediate;
        global.setImmediate = jest.fn();

        // Call Q.nextTick
        Q.nextTick(() => {});

        // Check if setImmediate was called
        expect(global.setImmediate).toHaveBeenCalledTimes(1);

        // Restore the original setImmediate
        global.setImmediate = originalSetImmediate;
    });
});