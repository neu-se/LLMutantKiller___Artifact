import { Q } from '../../q';

describe('Q', () => {
    it('should return true for isFulfilled when given a fulfilled promise', () => {
        const promise = Q(10);
        expect(Q.isFulfilled(promise)).toBe(true);
        expect(promise.isFulfilled()).toBe(true);
    });

    it('should return false for isFulfilled when given a rejected promise', () => {
        const promise = Q.reject(new Error());
        expect(Q.isFulfilled(promise)).toBe(false);
        expect(promise.isFulfilled()).toBe(false);
    });
});