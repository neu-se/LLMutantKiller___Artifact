import { Q } from "./q.js";

describe("Q.isRejected", () => {
    it("should return false for a non-promise value and false for a fulfilled promise, but true for a rejected promise", () => {
        const nonPromiseValue = 10;
        const fulfilledPromise = Q(10);
        const rejectedPromise = Q.reject(new Error("Test error"));
        expect(Q.isRejected(nonPromiseValue)).toBe(false);
        expect(Q.isRejected(fulfilledPromise)).toBe(false);
        expect(Q.isRejected(rejectedPromise)).toBe(true);
    });
});