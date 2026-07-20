import { Q } from "./q.js";

describe("Q.isPending", () => {
    it("should return true for a pending promise and false for a non-pending promise", () => {
        const pendingPromise = Q.defer().promise;
        const nonPendingPromise = Q.resolve();
        expect(Q.isPending(pendingPromise)).toBe(true);
        expect(Q.isPending(nonPendingPromise)).toBe(false);
    });
});