import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should handle domain binding correctly', () => {
        const process = { domain: {} };
        const onUnhandledError = jest.fn();
        const promise = Q.resolve();
        promise.done(null, null, onUnhandledError);
        expect(onUnhandledError).toHaveBeenCalledTimes(0);
    });
});