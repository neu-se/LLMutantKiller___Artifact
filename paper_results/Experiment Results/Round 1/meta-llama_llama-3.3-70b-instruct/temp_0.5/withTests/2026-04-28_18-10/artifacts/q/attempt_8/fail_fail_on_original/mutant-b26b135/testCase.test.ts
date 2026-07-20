import Q from '../../q';

describe('Q', () => {
    it('should return keys of an object', async () => {
        const obj = { a: 1, b: 2 };
        const result = Q(obj).keys();
        if (result instanceof Promise) {
            await expect(result).resolves.toEqual(['a', 'b']);
        } else {
            expect(result).toEqual(['a', 'b']);
        }
    });
});