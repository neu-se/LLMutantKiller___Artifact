import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected", () => {
    it("should return false for a promise that is always resolved", () => {
        const promise = q(10);
        expect(q.isRejected(promise)).toBe(false);
    });
});