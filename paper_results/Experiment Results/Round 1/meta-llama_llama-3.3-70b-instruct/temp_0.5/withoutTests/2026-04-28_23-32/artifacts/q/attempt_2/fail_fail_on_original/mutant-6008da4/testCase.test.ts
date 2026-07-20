import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle the case where isNodeJS is false', () => {
        // Save the original isNodeJS value
        const originalIsNodeJS = global.isNodeJS;

        // Temporarily set isNodeJS to false
        global.isNodeJS = false;

        // Try to create a promise using Q
        const promise = Q.resolve('test');

        // Restore the original isNodeJS value
        global.isNodeJS = originalIsNodeJS;

        // Check if the promise is resolved
        expect(promise.isFulfilled()).toBe(true);
    });
});