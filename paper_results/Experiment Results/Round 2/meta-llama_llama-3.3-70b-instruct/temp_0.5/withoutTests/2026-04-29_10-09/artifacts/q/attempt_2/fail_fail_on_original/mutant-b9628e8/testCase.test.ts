import { Q } from "../../../../../q.js";

describe("Q Promise", () => {
    it("should delete a property from an object", () => {
        const obj = Q({ a: 1, b: 2 });
        const promise = obj["delete"]("a");
        return promise.then(() => {
            return obj.then((value) => {
                expect(value).toEqual({ b: 2 });
            });
        });
    });
});