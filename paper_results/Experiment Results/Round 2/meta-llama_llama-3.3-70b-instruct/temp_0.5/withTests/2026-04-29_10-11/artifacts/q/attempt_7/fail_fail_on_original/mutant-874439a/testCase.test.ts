import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected", () => {
    it("should return false for a fulfilled promise and not true for a fulfilled promise", () => {
        const promise = Q(10);
        expect(Q.isRejected(promise)).toBe(false);
        expect(Q.isRejected(promise)).not.toBe(true);
    });
});