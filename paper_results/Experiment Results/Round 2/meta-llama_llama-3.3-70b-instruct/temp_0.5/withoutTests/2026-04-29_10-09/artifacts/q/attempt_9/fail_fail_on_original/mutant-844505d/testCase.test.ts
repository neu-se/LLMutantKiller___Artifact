import { Q } from "./q.js";

describe('Q', () => {
    it('should handle domain binding correctly', () => {
        const onUnhandledError = jest.fn();
        const promise = Q.defer().promise;
        Q.done(promise, null, null, null);
        promise.reject(new Error('Test error'));
        if (typeof process === "object" && process && process.domain) {
            expect(onUnhandledError).toHaveBeenCalledTimes(1);
        } else {
            expect(onUnhandledError).toHaveBeenCalledTimes(0);
        }
    });
});