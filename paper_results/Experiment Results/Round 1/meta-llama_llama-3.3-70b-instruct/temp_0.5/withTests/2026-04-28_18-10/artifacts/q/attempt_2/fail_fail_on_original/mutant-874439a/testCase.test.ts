import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected", () => {
    it("should return false for a promise that is always resolved", () => {
        const promise = Q(true);
        expect(Q.isRejected(promise)).toBe(false);
    });
});