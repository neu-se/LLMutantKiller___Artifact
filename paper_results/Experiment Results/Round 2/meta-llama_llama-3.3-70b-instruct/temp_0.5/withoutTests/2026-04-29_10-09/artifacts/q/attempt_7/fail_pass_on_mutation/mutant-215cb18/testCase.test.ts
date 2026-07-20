describe('Q', () => {
    it('should define property with descriptor and return the object', () => {
        var obj: any = {};
        var prop = 'test';
        var descriptor = { value: 'testValue', configurable: true, enumerable: true, writable: true };
        var object_defineProperty = Object.defineProperty || function (obj: any, prop: string, descriptor: any) {
            obj[prop] = descriptor.value;
            return obj;
        };
        var result = object_defineProperty(obj, prop, descriptor);
        expect(Object.keys(result)).toEqual(['test']);
        expect(Object.getOwnPropertyDescriptor(result, prop)).toHaveProperty('configurable', descriptor.configurable);
        expect(Object.getOwnPropertyDescriptor(result, prop)).toHaveProperty('enumerable', descriptor.enumerable);
        expect(Object.getOwnPropertyDescriptor(result, prop)).toHaveProperty('writable', descriptor.writable);
    });
});