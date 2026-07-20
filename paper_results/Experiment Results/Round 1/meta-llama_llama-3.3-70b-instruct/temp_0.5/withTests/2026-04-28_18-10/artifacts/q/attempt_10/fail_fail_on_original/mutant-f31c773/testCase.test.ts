describe("Q.set function", () => {
    it("should set a property on an object and return a promise for undefined", () => {
        const object: any = {};
        const key = "testKey";
        const value = "testValue";

        const Q = require('../../../../q.js');
        return Q(object).set(key, value).then((result: any) => {
            expect(result).toBeUndefined();
            expect(object[key]).toBe(value);
        });
    });

    it("should set a property on an object with the correct value when called with an array", () => {
        const object: any = {};
        const key = "testKey";
        const value = "testValue";

        const Q = require('../../../../q.js');
        return Q(object).set(key, [value]).then((result: any) => {
            expect(result).toBeUndefined();
            expect(object[key]).toEqual([value]);
        });
    });
});