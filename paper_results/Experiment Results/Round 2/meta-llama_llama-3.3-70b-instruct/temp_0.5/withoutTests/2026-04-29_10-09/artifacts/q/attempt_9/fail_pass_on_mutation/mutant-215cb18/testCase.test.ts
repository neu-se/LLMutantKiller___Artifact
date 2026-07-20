describe('Q', () => {
    it('should define property with descriptor and have the same descriptor', () => {
        var obj: any = {};
        var prop = 'test';
        var descriptor = { value: 'testValue', configurable: true, enumerable: true, writable: true };
        var object_defineProperty = Object.defineProperty || function (obj: any, prop: string, descriptor: any) {
            obj[prop] = descriptor.value;
            return obj;
        };
        object_defineProperty(obj, prop, descriptor);
        var definedDescriptor = Object.getOwnPropertyDescriptor(obj, prop);
        expect(definedDescriptor).toEqual(descriptor);
    });
});