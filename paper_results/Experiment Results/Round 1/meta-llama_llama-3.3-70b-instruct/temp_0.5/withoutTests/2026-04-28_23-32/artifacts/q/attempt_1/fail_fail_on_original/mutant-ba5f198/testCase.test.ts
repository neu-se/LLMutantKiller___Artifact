import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle setImmediate correctly', () => {
        // Create a promise that resolves immediately
        const promise = Q.resolve();
        
        // Use the promise to test the behavior of setImmediate
        promise.then(() => {
            // If setImmediate is a function, it should be called
            if (typeof setImmediate === 'function') {
                expect(setImmediate).toHaveBeenCalledTimes(1);
            } else {
                // If setImmediate is not a function, the fallback should be used
                expect(setTimeout).toHaveBeenCalledTimes(1);
            }
        });
    });
});