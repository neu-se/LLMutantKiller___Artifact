import { Q } from "../../../q";

describe("Q", () => {
    it("should delete a property from an object", () => {
        const obj = { foo: "bar" };
        return Q(obj).del("foo").then(() => {
            expect(obj).not.toHaveProperty("foo");
        });
    });

    it("should throw an error when deleting a property with an empty string", () => {
        const obj = { foo: "bar" };
        return Q(obj).del("").then(() => {
            expect(obj).toHaveProperty("foo");
        }, (error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});