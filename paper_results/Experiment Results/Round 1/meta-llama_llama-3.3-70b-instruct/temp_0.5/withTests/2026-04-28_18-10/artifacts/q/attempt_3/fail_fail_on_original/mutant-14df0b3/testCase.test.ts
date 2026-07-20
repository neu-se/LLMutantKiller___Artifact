import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete", () => {
    it("should delete a property from an object", () => {
        const obj = { a: 1, b: 2 };
        const promise = Q(obj).delete("a");
        return promise.then(() => {
            expect(obj).toEqual({ b: 2 });
        });
    });
});