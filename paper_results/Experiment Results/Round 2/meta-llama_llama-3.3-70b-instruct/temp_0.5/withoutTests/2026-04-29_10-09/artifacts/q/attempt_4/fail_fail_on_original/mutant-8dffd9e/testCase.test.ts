import { Q } from "../q.js";

describe("Q.isPending", () => {
    it("should return false for a fulfilled promise and true for a pending promise", () => {
        const fulfilledPromise = Q.resolve();
        expect(Q.isPending(fulfilledPromise)).toBe(false);
        const pendingPromise = Q.defer().promise;
        expect(Q.isPending(pendingPromise)).toBe(true);
    });
});