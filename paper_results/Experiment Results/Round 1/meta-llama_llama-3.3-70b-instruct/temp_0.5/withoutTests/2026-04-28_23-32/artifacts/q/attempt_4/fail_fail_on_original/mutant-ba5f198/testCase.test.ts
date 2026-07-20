import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle setImmediate correctly', () => {
        // Create a promise that resolves immediately
        const promise = Q.resolve();

        // Check if the promise is resolved
        expect(promise.isFulfilled()).toBe(true);

        // Check if the condition for setImmediate is met
        if (typeof setImmediate === 'function') {
            expect(setImmediate).toHaveBeenCalledTimes(1);
        } else {
            expect(setTimeout).toHaveBeenCalledTimes(1);
        }
    });
});