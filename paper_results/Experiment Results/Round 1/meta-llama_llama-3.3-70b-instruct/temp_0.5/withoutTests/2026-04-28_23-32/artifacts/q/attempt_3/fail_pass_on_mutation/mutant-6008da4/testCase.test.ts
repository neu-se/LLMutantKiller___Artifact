import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle the case where isNodeJS is false', () => {
        // Save the original process object
        const originalProcess = global.process;

        // Temporarily set process to an object without nextTick
        global.process = {};

        // Try to create a promise using Q
        const promise = Q.resolve('test');

        // Restore the original process object
        global.process = originalProcess;

        // Check if the promise is resolved
        expect(promise.isFulfilled()).toBe(true);
    });
});