describe('Q', () => {
    it('should define property with descriptor and return the object with descriptor', () => {
        var obj = {};
        var prop = 'test';
        var descriptor = { value: 'testValue', configurable: true, enumerable: true, writable: true };
        var object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
            obj[prop] = descriptor.value;
            return obj;
        };
        var result = object_defineProperty(obj, prop, descriptor);
        expect(Object.getOwnPropertyDescriptor(result, prop)).toEqual(descriptor);
    });
});