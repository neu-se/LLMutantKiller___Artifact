const q = require('./q');

describe('Q', () => {
    it('should define property correctly', () => {
        const obj = {};
        const descriptor = { value: 'test', configurable: true, enumerable: true };
        q.object_defineProperty(obj, 'test', descriptor);
        expect(Object.prototype.hasOwnProperty.call(obj, 'test')).toBe(true);
    });
});