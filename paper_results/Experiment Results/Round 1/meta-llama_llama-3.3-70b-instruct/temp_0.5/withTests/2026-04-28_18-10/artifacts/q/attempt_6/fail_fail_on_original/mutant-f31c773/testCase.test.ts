import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.set function", () => {
    it("should set a property on an object and return a promise for undefined", () => {
        const object: any = {};
        const key = "testKey";
        const value = "testValue";

        return Q(object).set(key, value).then((result: any) => {
            expect(result).toBeUndefined();
            expect(object[key]).toBe(value);
        });
    });

    it("should fail when the set method does not set the property", () => {
        const object: any = {};
        const key = "testKey";
        const value = "testValue";

        // Simulate the mutated code by not setting the property
        const originalSet = Q.set;
        Q.set = () => Q.resolve(undefined);
        return Q(object).set(key, value).then((result: any) => {
            expect(result).toBeUndefined();
            expect(object[key]).not.toBe(value);
        }).finally(() => {
            Q.set = originalSet;
        });
    });
});