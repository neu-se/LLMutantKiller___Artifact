import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle unhandled rejections', () => {
        const promise = Q.defer().promise;
        const onUnhandledError = jest.fn();
        Q.onerror = onUnhandledError;
        process.domain = { bind: jest.fn((fn) => fn) };
        promise.done();
        expect(onUnhandledError).not.toHaveBeenCalled();
        promise.reject(new Error('Test error'));
        expect(onUnhandledError).toHaveBeenCalledTimes(1);
    });
});