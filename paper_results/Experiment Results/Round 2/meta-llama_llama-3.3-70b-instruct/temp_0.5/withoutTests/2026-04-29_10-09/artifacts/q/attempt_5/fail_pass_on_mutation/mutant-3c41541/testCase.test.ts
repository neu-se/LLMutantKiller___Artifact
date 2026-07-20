import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q.delete", () => {
    it("should delete a property from an object", () => {
        const obj = { foo: "bar", delete: () => {} };
        const promise = Q(obj).delete("foo");
        return promise.then(() => {
            expect(obj).not.toHaveProperty("foo");
            expect(obj).toHaveProperty("delete");
        });
    });
});