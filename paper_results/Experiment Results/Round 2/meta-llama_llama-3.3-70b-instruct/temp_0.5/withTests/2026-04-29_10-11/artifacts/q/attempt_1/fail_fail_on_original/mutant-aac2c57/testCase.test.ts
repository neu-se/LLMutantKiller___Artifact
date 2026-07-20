import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should handle domain binding correctly', () => {
        const process = { domain: {} };
        const onUnhandledError = jest.fn();
        const promise = Q();
        promise.done(null, null, onUnhandledError);
        expect(onUnhandledError).toBe(process.domain.bind(onUnhandledError));
    });
});