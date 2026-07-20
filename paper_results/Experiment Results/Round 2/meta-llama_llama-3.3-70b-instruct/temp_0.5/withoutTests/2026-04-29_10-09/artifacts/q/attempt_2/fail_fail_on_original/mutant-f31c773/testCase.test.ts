import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
    it("should set the property on the object", () => {
        const object = {};
        const key = "testKey";
        const value = "testValue";

        Q.set(object, key, value);

        expect(object[key]).toBe(value);
    });
});