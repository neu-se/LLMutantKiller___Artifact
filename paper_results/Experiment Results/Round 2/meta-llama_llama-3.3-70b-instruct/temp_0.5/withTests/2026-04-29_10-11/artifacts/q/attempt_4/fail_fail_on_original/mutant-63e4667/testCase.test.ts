import Q from '../q';

describe('Promise', () => {
    it('should return keys of an object as an array', () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).keys().then((keys) => {
            expect(Array.isArray(keys)).toBe(true);
        });
    });
});