import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle unhandled promise rejections', () => {
        const promise = Q.reject(new Error('Test error'));
        const onUnhandledError = jest.fn();
        Q.onerror = onUnhandledError;
        promise.done();
        expect(onUnhandledError).toHaveBeenCalledTimes(1);
        expect(onUnhandledError).toHaveBeenCalledWith(new Error('Test error'));
    });
});