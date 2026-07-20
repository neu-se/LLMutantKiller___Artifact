import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should reject the promise with the correct error when timed out', () => {
        const promise = Q(Promise.resolve('test')).timeout(50);
        return expect(promise).rejects.toThrowError('Timed out after 50 ms');
    });
});