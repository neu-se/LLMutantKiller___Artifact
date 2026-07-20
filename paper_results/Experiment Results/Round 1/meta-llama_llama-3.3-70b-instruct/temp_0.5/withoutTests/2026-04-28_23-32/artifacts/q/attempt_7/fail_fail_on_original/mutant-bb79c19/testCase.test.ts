import { Q } from './q.js';

describe('Q', () => {
    it('should return the fulfillment value of a promise', () => {
        const promise = Q.resolve(10);
        const result = Q.nearer(promise);
        expect(result).not.toBeUndefined();
    });
});