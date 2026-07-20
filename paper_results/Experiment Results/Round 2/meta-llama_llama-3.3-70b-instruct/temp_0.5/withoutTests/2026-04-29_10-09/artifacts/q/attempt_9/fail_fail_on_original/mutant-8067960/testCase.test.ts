import { Q } from "../../../q.js";

describe("Q.get function", () => {
    it("should return the value for the given key", () => {
        const object = { foo: "bar" };
        const key = "foo";
        const result = Q(object).get(key);
        expect(result).resolves.toBe("bar");
    });

    it("should fail when Q.get is empty", () => {
        const originalGet = Q.get;
        Q.get = function (object, key) { };
        expect(() => Q.get({ foo: "bar" }, "foo")).toThrowError();
        Q.get = originalGet;
    });
});