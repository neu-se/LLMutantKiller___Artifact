import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw an error when process.nextTick is not available', () => {
        // Save the original process.nextTick
        const originalNextTick = process.nextTick;

        // Temporarily set process.nextTick to undefined
        process.nextTick = undefined;

        // Try to create a promise using Q
        const promise = Q.resolve('test');

        // Restore the original process.nextTick
        process.nextTick = originalNextTick;

        // Check if the promise is resolved
        expect(promise.isFulfilled()).toBe(true);
    });
});