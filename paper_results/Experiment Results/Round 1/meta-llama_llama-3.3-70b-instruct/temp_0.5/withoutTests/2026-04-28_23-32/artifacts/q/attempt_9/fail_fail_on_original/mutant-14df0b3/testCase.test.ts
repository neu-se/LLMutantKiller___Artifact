describe('Q', () => {
    it('should delete a property from an object', () => {
        const Q = require('../../../../../../../q.js');
        const object = { foo: 'bar' };
        const result = Q["delete"](object, 'foo');
        expect(result).not.toBeUndefined();
    });
});