import { Q } from '../q';

describe('Promise.prototype.spread', () => {
    it('should call the fulfilled callback with the values of the promised array', async () => {
        const promise = Q([1, 2, 3]);
        const result = await promise.spread((a, b, c) => [a, b, c]);
        expect(result).toEqual([1, 2, 3]);
    });
});