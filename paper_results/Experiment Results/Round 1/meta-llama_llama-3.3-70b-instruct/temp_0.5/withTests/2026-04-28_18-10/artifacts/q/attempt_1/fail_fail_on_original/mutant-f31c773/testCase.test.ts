import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.set function", () => {
    it("should set a property on an object and return a promise for undefined", () => {
        const object = {};
        const key = "testKey";
        const value = "testValue";

        return Q(object).set(key, value).then((result) => {
            expect(result).toBeUndefined();
            expect(object[key]).toBe(value);
        });
    });
});