import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const promise = Q(10);
        expect(promise.valueOf).toThrow();
    });
});