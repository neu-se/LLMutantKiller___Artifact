import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const callback = function () { throw new Error(); };
        const promise = Q("foo").fin(callback);
        return promise.then((value) => {
            expect(true).toBe(false);
        }).catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});