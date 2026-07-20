import { Q } from './q';

describe('Q', () => {
    it('should return keys of an object', async () => {
        const obj = { a: 1, b: 2 };
        try {
            const keys = await Q(obj).keys();
            expect(keys).toEqual(['a', 'b']);
        } catch (error) {
            expect.fail('keys function should not throw an error');
        }
    });

    it('should throw an error when keys function is empty', async () => {
        const obj = { a: 1, b: 2 };
        const originalKeys = Q(obj).keys;
        Q(obj).keys = function () {};
        try {
            await Q(obj).keys();
            expect.fail('keys function should throw an error');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
        Q(obj).keys = originalKeys;
    });
});