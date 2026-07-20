import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete", () => {
    it("should throw an error when the delete operation is not implemented", () => {
        const obj = {};
        const promise = Q(obj).delete("a");
        return promise.then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});