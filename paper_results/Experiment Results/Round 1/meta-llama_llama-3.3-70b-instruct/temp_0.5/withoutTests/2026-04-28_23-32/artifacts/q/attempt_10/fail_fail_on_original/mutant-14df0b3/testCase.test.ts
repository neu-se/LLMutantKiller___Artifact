describe('Q', () => {
    it('should delete a property from an object', () => {
        const Q = require('./q');
        const object = { foo: 'bar' };
        const result = Q["delete"](object, 'foo');
        expect(object).not.toHaveProperty('foo');
    });
});