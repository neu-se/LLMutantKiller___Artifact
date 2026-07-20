import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should return the fulfillment value of a promise', () => {
        const promise = Q.resolve('fulfilled');
        const result = Q.nearer(promise);
        expect(result).toBe('fulfilled');
    });
});