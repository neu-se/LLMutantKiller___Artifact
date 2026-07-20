import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.get function", () => {
    it("should return a promise for the property value of an object", () => {
        const object = { a: 1 };
        const key = "a";
        const promise = Q(object).get(key);
        return promise.then((value: any) => {
            expect(value).toBe(1);
        });
    });
});