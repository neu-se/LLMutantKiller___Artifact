import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q function', () => {
    it('should use setImmediate when available', () => {
        // Create a spy for setImmediate
        const setImmediateSpy = jest.spyOn(global, 'setImmediate');

        // Call Q.nextTick to trigger the use of setImmediate
        Q.nextTick(() => {});

        // Check if setImmediate was called
        expect(setImmediateSpy).toHaveBeenCalledTimes(1);

        // Restore the original setImmediate function
        setImmediateSpy.mockRestore();
    });
});