const q = (function (definition) {
    // implementation of q.js
    return {
        object_defineProperty: Object.defineProperty
    };
})(function () {
    // implementation of q.js
});

describe('Q', () => {
    it('should define property correctly', () => {
        const obj = {};
        const descriptor = { value: 'test', configurable: true, enumerable: true };
        q.object_defineProperty(obj, 'test', descriptor);
        expect(Object.prototype.hasOwnProperty.call(obj, 'test')).toBe(true);
    });
});