import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q.delete", () => {
    it("should delete a property from an object", () => {
        const obj = { foo: "bar" };
        const promise = Q(obj).delete("foo");
        return promise.then((result) => {
            expect(result).toBeUndefined();
            expect(obj).not.toHaveProperty("foo");
        });
    });

    it("should reject if the property does not exist", () => {
        const obj = { foo: "bar" };
        const promise = Q(obj).delete("baz");
        return promise.then((result) => {
            expect(result).toBeUndefined();
            expect(obj).toHaveProperty("foo");
        });
    });

    it("should handle promises", () => {
        const obj = { foo: "bar" };
        const promise = Q(Promise.resolve(obj)).delete("foo");
        return promise.then((result) => {
            expect(result).toBeUndefined();
            expect(obj).not.toHaveProperty("foo");
        });
    });
});