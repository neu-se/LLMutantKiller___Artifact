import q from "./q.js";

describe('Q', () => {
    it('should return the fulfillment value of a promise', () => {
        const promise = q('fulfilled');
        const result = q.nearer(promise);
        expect(result).toBe('fulfilled');
    });
});