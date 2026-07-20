describe("Q", () => {
    it("should handle self being defined when window is undefined", () => {
        const originalWindow = globalThis.window;
        const originalSelf = globalThis.self;
        globalThis.window = undefined;
        globalThis.self = {};
        const q = globalThis.Q;
        expect(q).toBeDefined();
        const result = q();
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result.constructor.name).toBe('Promise');
        result.then((value) => {
            expect(value).toBeDefined();
            expect(typeof value).toBe('object');
            expect(Object.keys(value)).toHaveLength(0);
            expect(value.constructor.name).toBe('Object');
            expect(Object.prototype.toString.call(value)).toBe('[object Object]');
            expect(JSON.stringify(value)).toBe('{}');
            expect(value instanceof Object).toBe(true);
            expect(Object.getPrototypeOf(value)).toBe(Object.prototype);
            expect(value === Object.create(null)).toBe(false);
            expect(Object.isSealed(value)).toBe(false);
            expect(Object.isFrozen(value)).toBe(false);
            expect(Object.isExtensible(value)).toBe(true);
            expect(Object.getOwnPropertyDescriptor(value, '__proto__')).toBeDefined();
            expect(Object.getOwnPropertyNames(value)).toEqual(['__proto__']);
            expect(Object.getOwnPropertySymbols(value)).toEqual([]);
            expect(Object.preventExtensions(value)).toBe(value);
            expect(Object.seal(value)).toBe(value);
            expect(Object.freeze(value)).toBe(value);
            expect(Object.is(value, value)).toBe(true);
            expect(value.toString()).toBe('[object Object]');
            expect(Object.values(value)).toEqual([]);
            expect(Object.entries(value)).toEqual([]);
            expect(Object.getOwnPropertyDescriptors(value)).toEqual({
                __proto__: {
                    value: Object.prototype,
                    writable: true,
                    enumerable: false,
                    configurable: true,
                },
            });
            expect(Object.hasOwn(value, '__proto__')).toBe(true);
            expect(Object.assign({}, value)).toEqual({});
            expect(Object.create(value)).toBeInstanceOf(Object);
            expect(Object.getOwnPropertyNames(Object.create(value))).toEqual([]);
        });
        globalThis.window = originalWindow;
        globalThis.self = originalSelf;
    });
});