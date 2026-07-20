import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call nextTick with a function', (done) => {
        // Set up a spy for setTimeout
        const originalSetTimeout = global.setTimeout;
        const setTimeoutSpy = jest.fn();
        global.setTimeout = setTimeoutSpy;

        // Set setImmediate to undefined to trigger the else condition
        const originalSetImmediate = global.setImmediate;
        global.setImmediate = undefined;

        // Call Q.nextTick with a function
        Q.nextTick(() => {
            // Check if setTimeout was called
            expect(setTimeoutSpy).toHaveBeenCalledTimes(1);

            // Restore the original setTimeout and setImmediate
            global.setTimeout = originalSetTimeout;
            global.setImmediate = originalSetImmediate;

            // Call done to indicate the test is complete
            done();
        });

        // Make sure the test times out if nextTick doesn't call the function
        jest.setTimeout(100);
    });
});