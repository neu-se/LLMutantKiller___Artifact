import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick", () => {
    it("should not use setImmediate if available in the mutated code", () => {
        // Mock setImmediate
        const originalSetImmediate = global.setImmediate;
        global.setImmediate = jest.fn();

        // Call Q.nextTick
        Q.nextTick(() => {});

        // Check if setImmediate was not called
        expect(global.setImmediate).toHaveBeenCalledTimes(0);

        // Restore the original setImmediate
        global.setImmediate = originalSetImmediate;
    });
});