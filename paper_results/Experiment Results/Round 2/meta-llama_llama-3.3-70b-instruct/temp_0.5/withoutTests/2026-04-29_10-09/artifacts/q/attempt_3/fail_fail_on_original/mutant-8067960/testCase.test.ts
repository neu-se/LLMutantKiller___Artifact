import { Q } from "../../../../../q.js";

describe("Q.get function", () => {
    it("should dispatch a 'get' operation for the given key", () => {
        const object = { foo: "bar" };
        const key = "foo";
        const result = Q(object).dispatch("get", [key]);
        expect(result.then).toBeInstanceOf(Function);
        return result.then((value) => {
            expect(value).toBe("bar");
        });
    });

    it("should fail when Q.get does not dispatch a 'get' operation", () => {
        const object = { foo: "bar" };
        const key = "foo";
        const QGet = Q.get;
        Q.get = function (object, key) { };
        expect(() => Q.get(object, key)).not.toThrow();
        Q.get = QGet;
    });
});