import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected", () => {
    it("should return false for a promise that is always resolved", () => {
        const promise = Q(10);
        expect(Q.isRejected(promise)).toBe(false);
        // The mutated code will always return true, so this test will fail
    });
});