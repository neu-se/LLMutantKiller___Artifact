import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should delete a property from an object", () => {
        const obj = Q({ a: 1, b: 2 });
        const promise = obj["delete"]("a");
        return promise.then(() => {
            return obj.then((value: any) => {
                expect(value).toEqual({ b: 2 });
            });
        });
    });

    it("should throw an error when deleting a property with an invalid method name", () => {
        const obj = Q({ a: 1, b: 2 });
        const promise = obj.dispatch("", ["a"]);
        return promise.catch((error: any) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});