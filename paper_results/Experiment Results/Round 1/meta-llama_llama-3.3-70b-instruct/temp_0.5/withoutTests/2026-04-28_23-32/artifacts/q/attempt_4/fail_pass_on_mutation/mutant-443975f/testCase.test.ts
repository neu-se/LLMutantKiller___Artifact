import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call nextTick with a function', (done) => {
        // Set setImmediate to undefined to trigger the else condition
        const originalSetImmediate = global.setImmediate;
        global.setImmediate = undefined;

        // Call Q.nextTick with a function
        Q.nextTick(() => {
            // Restore the original setImmediate
            global.setImmediate = originalSetImmediate;

            // Call done to indicate the test is complete
            done();
        });
    });
});