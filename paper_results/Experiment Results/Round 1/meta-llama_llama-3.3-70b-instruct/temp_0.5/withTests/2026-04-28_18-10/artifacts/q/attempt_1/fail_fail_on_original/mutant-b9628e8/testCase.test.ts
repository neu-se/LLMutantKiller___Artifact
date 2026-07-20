import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should delete a property from an object", () => {
        const obj = { foo: "bar" };
        return Q(obj).del("foo").then(() => {
            expect(obj.foo).toBeUndefined();
        });
    });
});