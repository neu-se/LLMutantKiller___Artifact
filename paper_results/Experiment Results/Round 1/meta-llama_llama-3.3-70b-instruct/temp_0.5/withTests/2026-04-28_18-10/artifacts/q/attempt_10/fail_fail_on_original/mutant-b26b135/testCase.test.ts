import Q from './q.js';

describe('Q', () => {
    it('should return keys of an object', async () => {
        const obj = { a: 1, b: 2 };
        const result = Q(obj).keys();
        await expect(result).resolves.toEqual(['a', 'b']);
    });
});