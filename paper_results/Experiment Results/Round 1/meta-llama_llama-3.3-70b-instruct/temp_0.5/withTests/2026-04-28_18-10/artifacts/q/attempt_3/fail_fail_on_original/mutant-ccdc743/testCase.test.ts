import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        var callback = function () {};
        var promise = Q();
        expect(() => promise.fin(callback)).not.toThrowError();
        expect(promise.fin(callback)).toBe(promise);
    });
});