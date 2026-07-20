import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should return the same promise when given a promise", () => {
        const promise = q(Promise.resolve());
        expect(q(promise)).toBe(promise);
    });
});