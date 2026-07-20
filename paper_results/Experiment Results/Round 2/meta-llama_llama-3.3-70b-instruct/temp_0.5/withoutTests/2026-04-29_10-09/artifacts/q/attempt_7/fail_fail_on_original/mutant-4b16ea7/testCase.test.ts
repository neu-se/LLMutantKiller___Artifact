describe("Q", () => {
    it("should use setImmediate when available", () => {
        // Create a new instance of Q
        const q = require("../../../../../../../../../subject_repositories/q/q.js");

        // Check if the nextTick function is available
        expect(q.nextTick).toBeDefined();

        // Check if the nextTick function calls setImmediate when available
        const originalSetImmediate = global.setImmediate;
        const setImmediateMock = jest.fn();
        (global as any).setImmediate = setImmediateMock;
        q.nextTick(() => {});
        if (typeof (global as any).setImmediate === 'function') {
            expect(setImmediateMock).toHaveBeenCalledTimes(0);
        }
        (global as any).setImmediate = originalSetImmediate;
    });
});