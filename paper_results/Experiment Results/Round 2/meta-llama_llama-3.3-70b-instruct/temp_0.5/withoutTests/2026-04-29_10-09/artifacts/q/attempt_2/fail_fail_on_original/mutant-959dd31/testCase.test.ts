import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should reject the promise with the correct error when timed out', () => {
        const promise = Q(Promise.resolve('test')).timeout(50, 'test timeout');
        return expect(promise).rejects.toThrowError('test timeout');
    });
});