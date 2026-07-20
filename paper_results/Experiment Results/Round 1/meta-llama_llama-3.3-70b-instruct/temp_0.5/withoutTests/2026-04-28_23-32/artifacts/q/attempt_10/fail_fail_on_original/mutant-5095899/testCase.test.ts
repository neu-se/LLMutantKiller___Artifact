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
            expect(value).not.toBe(null);
            expect(value).not.toBeUndefined();
            expect(Object.keys(value)).toHaveLength(0);
            expect(Object.getPrototypeOf(value)).toBe(Object.prototype);
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
            expect(Object.create(value) instanceof Object).toBe(true);
            expect(Object.getPrototypeOf(Object.create(value))).toBe(value);
            expect(Object.isExtensible(Object.create(value))).toBe(true);
            expect(Object.isSealed(Object.create(value))).toBe(false);
            expect(Object.isFrozen(Object.create(value))).toBe(false);
            expect(Object.create(value) === value).toBe(false);
            expect(Object.create(value) !== value).toBe(true);
            expect(value instanceof Object).toBe(true);
            expect(value.constructor.name).toBe('Object');
            expect(value.__proto__).toBe(Object.prototype);
            expect(value.__proto__.__proto__).toBe(null);
            expect(value.__proto__.__proto__.__proto__).toBeUndefined();
            expect(value.__proto__.__proto__.__proto__.__proto__).toBeUndefined();
            expect(value.__proto__.__proto__.__proto__.__proto__.__proto__).toBeUndefined();
            expect(value.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__).toBeUndefined();
            expect(value.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__).toBeUndefined();
            expect(value.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__).toBeUndefined();
            expect(value.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__).toBeUndefined();
            expect(value.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__).toBeUndefined();
            expect(() => {
                Object.defineProperty(value, '__proto__', {
                    value: null,
                    writable: true,
                    enumerable: false,
                    configurable: true,
                });
            }).toThrowError();
            expect(() => {
                Object.defineProperty(value, '__proto__', {
                    value: Object.prototype,
                    writable: true,
                    enumerable: false,
                    configurable: true,
                });
            }).toThrowError();
            expect(() => {
                Object.setPrototypeOf(value, null);
            }).toThrowError();
            expect(() => {
                Object.setPrototypeOf(value, Object.prototype);
            }).toThrowError();
            expect(value.__proto__).toBe(Object.prototype);
            expect(() => {
                value.__proto__ = null;
            }).toThrowError();
            expect(() => {
                value.__proto__ = Object.prototype;
            }).toThrowError();
            expect(() => {
                Object.setPrototypeOf(value, {});
            }).toThrowError();
            expect(() => {
                Object.setPrototypeOf(value, {});
            }).toThrowError();
            expect(() => {
                Object.setPrototypeOf(value, undefined);
            }).toThrowError();
            expect(value).toEqual({});
        });
        globalThis.window = originalWindow;
        globalThis.self = originalSelf;
    });
});