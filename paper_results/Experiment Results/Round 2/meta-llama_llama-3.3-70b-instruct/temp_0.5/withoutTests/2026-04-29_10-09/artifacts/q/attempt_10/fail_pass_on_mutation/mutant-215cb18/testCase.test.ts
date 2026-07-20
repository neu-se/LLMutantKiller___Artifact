describe('Q', () => {
    it('should return the object when defining a property', () => {
        var obj: any = {};
        var prop = 'test';
        var descriptor = { value: 'testValue', configurable: true, enumerable: true, writable: true };
        var originalDefineProperty = Object.defineProperty;
        Object.defineProperty = function (obj: any, prop: string, descriptor: any) {
            obj[prop] = descriptor.value;
        };
        var result = Object.defineProperty(obj, prop, descriptor);
        expect(result).toBeUndefined();
        Object.defineProperty = originalDefineProperty;
    });
});