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

    it("should fail when the set method is called with an empty array", () => {
        const object: any = {};
        const key = "testKey";
        const value = "testValue";

        return Q(object).set(key, value).then(() => {
            return Q(object).set(key, []).then((result: any) => {
                expect(result).toBeUndefined();
                expect(object[key]).toBeUndefined();
            });
        });
    });
});