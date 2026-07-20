import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should use setImmediate when available", () => {
        // Create a promise using Q
        const promise = Q.resolve();

        // Check if the promise is resolved
        expect(promise).not.toBeNull();

        // Create a spy for setImmediate
        const originalSetImmediate = global.setImmediate;
        const setImmediateSpy = jest.fn();
        global.setImmediate = setImmediateSpy;

        // Create a new promise using Q
        Q.resolve().then(() => {});

        // Check if setImmediate was called
        expect(setImmediateSpy).toHaveBeenCalledTimes(1);

        // Restore the original setImmediate function
        global.setImmediate = originalSetImmediate;
    });
});