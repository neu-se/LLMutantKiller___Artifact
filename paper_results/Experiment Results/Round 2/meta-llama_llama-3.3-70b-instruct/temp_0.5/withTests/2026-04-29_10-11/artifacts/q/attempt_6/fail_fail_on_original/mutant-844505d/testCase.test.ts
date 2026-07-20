import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain binding correctly', () => {
        const promise = Q();
        const onUnhandledError = jest.fn();
        promise.done(onUnhandledError);
        expect(onUnhandledError).toHaveBeenCalledTimes(0);
    });
});