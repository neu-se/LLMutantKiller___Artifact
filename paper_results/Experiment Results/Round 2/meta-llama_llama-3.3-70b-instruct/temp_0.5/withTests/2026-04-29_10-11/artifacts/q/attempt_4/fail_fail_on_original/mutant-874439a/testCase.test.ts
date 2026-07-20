import { Q } from "../../../q.js";

describe("Q.isRejected", () => {
    it("should return false for a non-promise value and a fulfilled promise", () => {
        const nonPromiseValue = 10;
        const fulfilledPromise = Q(10);
        expect(Q.isRejected(nonPromiseValue)).toBe(false);
        expect(Q.isRejected(fulfilledPromise)).toBe(false);
    });
});