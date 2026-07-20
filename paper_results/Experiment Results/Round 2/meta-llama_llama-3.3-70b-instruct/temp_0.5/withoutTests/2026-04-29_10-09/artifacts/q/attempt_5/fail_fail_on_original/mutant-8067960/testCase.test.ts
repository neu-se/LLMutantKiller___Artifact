import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.get function", () => {
    it("should dispatch a 'get' operation for the given key and return a promise", () => {
        const object = { foo: "bar" };
        const key = "foo";
        const result = Q(object).dispatch("get", [key]);
        expect(result.then).toBeInstanceOf(Function);
        return result.then((value) => {
            expect(value).toBe("bar");
        });
    });

    it("should throw an error when Q.get does not return a promise", () => {
        const originalGet = Q.get;
        Q.get = function (object, key) { return undefined; };
        expect(() => Q.get({}, "")).toThrowError();
        Q.get = originalGet;
    });
});