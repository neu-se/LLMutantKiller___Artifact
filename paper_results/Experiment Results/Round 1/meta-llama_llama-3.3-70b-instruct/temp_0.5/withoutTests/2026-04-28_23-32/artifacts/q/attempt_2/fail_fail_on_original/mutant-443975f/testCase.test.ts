import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call nextTick with a function', (done) => {
        // Set up a spy for setImmediate
        const originalSetImmediate = global.setImmediate;
        const setImmediateSpy = jest.fn();
        global.setImmediate = setImmediateSpy;

        // Call Q.nextTick with a function
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