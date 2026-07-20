import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain binding correctly', () => {
        const promise = Q();
        const onUnhandledError = jest.fn();
        const originalOnUnhandledError = onUnhandledError;

        Q.onerror = onUnhandledError;
        promise.done();
        Q.onerror = null;

        expect(onUnhandledError).toBe(originalOnUnhandledError);
    });
});