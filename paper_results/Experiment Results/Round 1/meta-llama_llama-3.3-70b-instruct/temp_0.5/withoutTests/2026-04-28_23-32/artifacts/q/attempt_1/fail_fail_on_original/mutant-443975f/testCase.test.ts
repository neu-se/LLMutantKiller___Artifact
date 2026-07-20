import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call setImmediate when available', (done) => {
        // Create a promise that resolves immediately
        const promise = Q.resolve();

        // Set up a spy for setImmediate
        const originalSetImmediate = global.setImmediate;
        const setImmediateSpy = jest.fn();
        global.setImmediate = setImmediateSpy;

        // Call Q.nextTick with the promise
        Q.nextTick(() => {
            // Check if setImmediate was called
            expect(setImmediateSpy).toHaveBeenCalledTimes(1);

            // Restore the original setImmediate
            global.setImmediate = originalSetImmediate;

            // Call done to indicate the test is complete
            done();
        });
    });
});