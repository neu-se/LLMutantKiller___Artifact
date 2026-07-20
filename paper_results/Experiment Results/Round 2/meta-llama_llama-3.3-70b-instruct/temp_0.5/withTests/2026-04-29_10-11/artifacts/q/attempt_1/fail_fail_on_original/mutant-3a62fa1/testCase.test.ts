import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should preserve the original behavior when given a value", () => {
        const originalCodeResult = Q(5);
        expect(originalCodeResult.isFulfilled()).toBe(true);
    });
});