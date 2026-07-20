import Q from '../../q';

describe('Q', () => {
    it('should return keys of an object', () => {
        const obj = { a: 1, b: 2 };
        const keys = Q(obj).keys();
        expect(keys).toBeDefined();
    });
});