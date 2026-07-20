import { Q } from "./q";

describe('Q', () => {
    it('should return the fulfillment value of a promise when using Q.nearer', () => {
        const promise = Q(5);
        expect(Q.nearer(promise)).toBe(5);
    });

    it('should not return the fulfillment value of a promise when using Q.nearer on a non-fulfilled promise', () => {
        const promise = Q.reject(5);
        expect(Q.nearer(promise)).not.toBe(5);
    });
});