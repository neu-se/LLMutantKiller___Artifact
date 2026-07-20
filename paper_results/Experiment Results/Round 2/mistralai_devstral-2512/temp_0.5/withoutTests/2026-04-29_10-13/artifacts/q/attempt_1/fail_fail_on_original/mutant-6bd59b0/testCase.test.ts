import { Q } from "./q.js";

describe("Q.get", () => {
    it("should correctly retrieve a property value from a promise", async () => {
        const obj = { foo: "bar" };
        const promise = Q(obj);
        const result = await Q.get(promise, "foo");
        expect(result).toBe("bar");
    });
});