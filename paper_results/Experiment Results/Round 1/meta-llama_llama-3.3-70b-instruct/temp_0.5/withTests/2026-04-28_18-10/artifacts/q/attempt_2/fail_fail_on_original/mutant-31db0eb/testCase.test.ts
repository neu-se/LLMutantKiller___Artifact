import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q function', () => {
    it('should use window.setImmediate when available', () => {
        // Create a spy for setImmediate
        const originalSetImmediate = global.setImmediate;
        const setImmediateSpy = jest.fn();
        global.setImmediate = setImmediateSpy;

        // Mock the window object
        const originalWindow = global.window;
        global.window = { setImmediate: setImmediateSpy };

        // Call Q.nextTick to trigger the use of setImmediate
        Q.nextTick(() => {});

        // Check if setImmediate was called
        expect(setImmediateSpy).toHaveBeenCalledTimes(1);

        // Restore the original setImmediate function and window object
        global.setImmediate = originalSetImmediate;
        global.window = originalWindow;
    });
});