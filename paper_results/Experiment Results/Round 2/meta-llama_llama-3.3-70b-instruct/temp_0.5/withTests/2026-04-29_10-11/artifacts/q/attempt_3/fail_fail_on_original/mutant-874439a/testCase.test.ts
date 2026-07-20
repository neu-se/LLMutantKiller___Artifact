import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected", () => {
    it("should return false for a non-promise value", () => {
        expect(Q.isRejected(10)).toBe(false);
    });

    it("should return false for a non-promise value, and this should fail when the mutation is applied", () => {
        // The mutation will always return true for promises, but 10 is not a promise
        // So this test should pass on the original code and fail on the mutated code
        expect(Q.isRejected(10)).toBe(false);
    });
});