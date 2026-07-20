import { Q } from "../../../q.js";

describe("Q.get function", () => {
    it("should return the value for the given key", () => {
        const object = { foo: "bar" };
        const key = "foo";
        const result = Q(object).get(key);
        expect(result).resolves.toBe("bar");
    });

    it("should not be defined in the mutated code", () => {
        const originalGet = Q.get;
        Q.get = undefined;
        expect(Q.get).toBeUndefined();
        Q.get = originalGet;
    });
});