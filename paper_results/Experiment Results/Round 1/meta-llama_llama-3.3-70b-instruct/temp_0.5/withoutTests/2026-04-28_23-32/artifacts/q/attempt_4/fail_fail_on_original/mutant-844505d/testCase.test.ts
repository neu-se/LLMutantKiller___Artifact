import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle unhandled rejections', () => {
        const promise = Q.defer().promise;
        const onUnhandledError = jest.fn();
        Q.onerror = onUnhandledError;
        if (typeof process !== "undefined" && process.domain) {
            const originalDomainBind = process.domain.bind;
            process.domain.bind = jest.fn(originalDomainBind);
        }
        promise.done();
        promise.reject(new Error('Test error'));
        expect(onUnhandledError).toHaveBeenCalledTimes(1);
    });
});