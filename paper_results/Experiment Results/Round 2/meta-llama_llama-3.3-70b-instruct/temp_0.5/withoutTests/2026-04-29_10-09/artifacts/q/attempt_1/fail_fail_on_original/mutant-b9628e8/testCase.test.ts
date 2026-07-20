import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q Promise", () => {
    it("should delete a property from an object", () => {
        const obj = Q({ a: 1, b: 2 });
        const promise = obj["delete"]("a");
        return promise.then((result) => {
            expect(result).toBeUndefined();
            return obj.then((value) => {
                expect(value).toEqual({ b: 2 });
            });
        });
    });
});