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

    it("should fail when the set method does not set the property", () => {
        const object: any = {};
        const key = "testKey";
        const value = "testValue";

        const Q = require('../../../../q.js');
        const originalSet = Q.set;
        Q.set = (object: any, key: string, value: any) => Q.resolve(undefined);
        return Q(object).set(key, value).then((result: any) => {
            expect(result).toBeUndefined();
            expect(object[key]).not.toBe(value);
        }).finally(() => {
            Q.set = originalSet;
        });
    });
});