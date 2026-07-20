import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should use setImmediate when available", () => {
        // Create a spy for setImmediate
        const setImmediateSpy = jest.spyOn(global, 'setImmediate');

        // Create a promise using Q
        Q.resolve().then(() => {});

        // Check if setImmediate was called
        expect(setImmediateSpy).toHaveBeenCalledTimes(1);

        // Restore the original setImmediate function
        setImmediateSpy.mockRestore();
    });
});