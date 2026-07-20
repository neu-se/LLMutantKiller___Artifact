import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should reject the promise with the correct error when timed out', () => {
        const promise = Q.delay(Promise.resolve('test'), 100);
        const timeoutPromise = promise.timeout(50, 'test timeout');
        return expect(timeoutPromise).rejects.toThrowError('test timeout');
    });
});