import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain binding correctly', () => {
        const originalDone = Q.done;
        Q.done = jest.fn();
        const promise = Q();
        const onUnhandledError = jest.fn();
        promise.done(onUnhandledError);
        expect(Q.done).toHaveBeenCalledTimes(1);
        expect(Q.done).toHaveBeenCalledWith(promise, expect.any(Function), expect.any(Function), expect.any(Function));
        Q.done = originalDone;
    });
});