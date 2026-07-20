import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", () => {
        const promise = Q(10);
        expect(promise.valueOf()).toBe(10);
    });
});