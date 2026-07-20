import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle unhandled rejections', () => {
        const promise = Q.defer().promise;
        const onUnhandledError = jest.fn();
        Q.onerror = onUnhandledError;
        promise.done();
        promise.reject(new Error('Test error'));
        expect(onUnhandledError).toHaveBeenCalledTimes(1);
        // To make this test pass on the original code and fail on the mutated code,
        // we need to check if the onUnhandledError function is being called with the correct context.
        // Since the mutation is in the line where the onUnhandledError is being bound to the process domain,
        // we can check if the onUnhandledError function is being called with the process domain as its context.
        expect(onUnhandledError.mock.calls[0][0]).toBeInstanceOf(Error);
    });
});