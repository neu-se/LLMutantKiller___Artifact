import { Q } from "./q";

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

    it("should throw an error when deleting a property with an empty method name", () => {
        const obj = Q({ a: 1, b: 2 });
        const promise = obj.dispatch("", ["a"]);
        return promise.catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});