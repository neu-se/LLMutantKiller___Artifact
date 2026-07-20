import { Q } from "../../../../../q.js";

describe("Q.get function", () => {
    it("should dispatch a 'get' operation for the given key", () => {
        const object = { foo: "bar" };
        const key = "foo";
        const result = Q.get(object, key);
        expect(result).toBe("bar");
    });

    it("should throw an error when Q.get is not a function", () => {
        const originalGet = Q.get;
        Q.get = undefined;
        expect(() => Q.get({}, "")).toThrowError();
        Q.get = originalGet;
    });
});