import { Q } from "../../../../../q.js";

describe("Q", () => {
    it("should delete a property from an object", () => {
        const obj = { foo: "bar" };
        return Q(obj).del("foo").then(() => {
            expect(obj).not.toHaveProperty("foo");
        });
    });
});