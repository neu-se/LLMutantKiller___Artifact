const Q = require("../../../../q");

describe("Q.nextTick", () => {
    it("should use setImmediate if available", () => {
        // Mock setImmediate
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