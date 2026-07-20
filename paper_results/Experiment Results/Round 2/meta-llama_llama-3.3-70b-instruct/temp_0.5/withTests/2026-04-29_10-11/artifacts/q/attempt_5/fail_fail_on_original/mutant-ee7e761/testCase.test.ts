import { Q } from "../../../../../q";

describe("Promise", () => {
    it("should delete a property from an object", () => {
        const obj = { a: 1, b: 2 };
        const promise = Q(obj).del("a");
        return promise.then(() => {
            expect(obj).toEqual({ b: 2 });
        });
    });
});