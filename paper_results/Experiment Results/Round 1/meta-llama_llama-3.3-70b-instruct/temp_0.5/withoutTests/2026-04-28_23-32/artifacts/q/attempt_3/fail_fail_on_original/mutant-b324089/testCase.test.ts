import { Q } from "./q";

describe('Q', () => {
    it('should return the fulfillment value of a promise', () => {
        const promise = Q.resolve('fulfilled');
        const result = Q.nearer(promise);
        expect(typeof result).toBe('string');
    });
});