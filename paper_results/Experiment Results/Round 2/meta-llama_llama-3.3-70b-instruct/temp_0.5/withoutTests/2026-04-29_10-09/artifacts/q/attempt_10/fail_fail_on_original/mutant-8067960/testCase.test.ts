import { Q } from "../../../q.js";

describe("Q.get function", () => {
    it("should return the value for the given key", () => {
        const object = { foo: "bar" };
        const key = "foo";
        expect(Q.get(object, key)).toBe("bar");
    });
});