import { Q } from "../../../../../q";

describe("Promise", () => {
    it("should throw an error when trying to delete a property with an empty string", () => {
        const obj = { a: 1, b: 2 };
        const promise = Q(obj)["delete"]("");
        return promise.then(() => {
            expect(true).toBe(false);
        }).catch((error: any) => {
            expect(true).toBe(true);
        });
    });
});