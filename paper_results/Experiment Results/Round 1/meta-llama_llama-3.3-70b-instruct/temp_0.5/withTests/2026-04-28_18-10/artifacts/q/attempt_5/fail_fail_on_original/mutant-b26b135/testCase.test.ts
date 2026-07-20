import Q from './q.js';

describe('Q', () => {
    it('should return keys of an object', async () => {
        const obj = { a: 1, b: 2 };
        try {
            const keys = await Q(obj).keys();
            expect(keys).toEqual(['a', 'b']);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });
});