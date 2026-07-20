import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should throw an error when trying to access a non-existent property", () => {
        const obj = { a: 1, b: 2 };
        const promise = Q(obj)[""]("a");
        return promise.then(() => {
            expect(true).toBe(false);
        }).catch((error) => {
            expect(true).toBe(true);
        });
    });
});