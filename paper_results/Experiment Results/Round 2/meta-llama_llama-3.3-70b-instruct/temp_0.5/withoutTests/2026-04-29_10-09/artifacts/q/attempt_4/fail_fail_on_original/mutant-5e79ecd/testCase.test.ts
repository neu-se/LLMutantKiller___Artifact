import { Q } from "./q.js";

describe('Q', () => {
    it('should handle promise chains correctly', () => {
        const promise = Q.resolve('test');
        const fulfilled = jest.fn();
        const rejected = jest.fn();
        const progress = jest.fn();

        promise.done(fulfilled, rejected, progress);

        expect(fulfilled).toHaveBeenCalledTimes(1);
        expect(rejected).toHaveBeenCalledTimes(0);
        expect(progress).toHaveBeenCalledTimes(0);

        // Test the mutation by checking if the 'done' method is called with the correct promise
        const originalPromise = Q.resolve('original');
        originalPromise.done(fulfilled, rejected, progress);
        expect(fulfilled).toHaveBeenCalledTimes(2);

        // The mutation changes the condition to always be true, so the promise should always be the same
        const mutatedPromise = Q.resolve('mutated');
        mutatedPromise.done(null, rejected, progress);
        expect(rejected).toHaveBeenCalledTimes(0);
    });
});