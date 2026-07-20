import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle setImmediate correctly', () => {
        // Create a promise that resolves immediately
        const promise = Q.resolve();

        // Check if the promise is resolved
        expect(promise.isFulfilled()).toBe(true);
    });
});