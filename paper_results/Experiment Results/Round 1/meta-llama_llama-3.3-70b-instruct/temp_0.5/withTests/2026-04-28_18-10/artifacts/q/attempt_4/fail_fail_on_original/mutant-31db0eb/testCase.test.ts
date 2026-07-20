import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q function', () => {
    it('should use setImmediate when available and not use it when not available', () => {
        // Create a spy for setImmediate
        const originalSetImmediate = global.setImmediate;
        const setImmediateSpy = jest.fn();
        global.setImmediate = setImmediateSpy;

        // Call Q.nextTick to trigger the use of setImmediate
        Q.nextTick(() => {});

        // Check if setImmediate was called
        expect(setImmediateSpy).toHaveBeenCalledTimes(1);

        // Restore the original setImmediate function
        global.setImmediate = originalSetImmediate;

        // Delete setImmediate to simulate its unavailability
        delete global.setImmediate;

        // Create a spy for setTimeout
        const originalSetTimeout = global.setTimeout;
        const setTimeoutSpy = jest.fn();
        global.setTimeout = setTimeoutSpy;

        // Call Q.nextTick to trigger the use of setTimeout
        Q.nextTick(() => {});

        // Check if setTimeout was called
        expect(setTimeoutSpy).toHaveBeenCalledTimes(1);

        // Restore the original setTimeout function and setImmediate
        global.setTimeout = originalSetTimeout;
        global.setImmediate = originalSetImmediate;
    });
});