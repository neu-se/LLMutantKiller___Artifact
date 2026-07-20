import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.isPending", () => {
    it("should return false for a non-pending promise", () => {
        const fulfilledPromise = Q.resolve();
        expect(Q.isPending(fulfilledPromise)).toBe(false);
    });
});