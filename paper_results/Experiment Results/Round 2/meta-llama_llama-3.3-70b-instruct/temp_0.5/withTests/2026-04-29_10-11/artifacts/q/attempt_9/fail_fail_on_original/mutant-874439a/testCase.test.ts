import { Q } from "./q.js";

describe("Q.isRejected", () => {
    it("should return false for a fulfilled promise and true for a rejected promise, but the mutation should make it return true for a fulfilled promise", () => {
        const fulfilledPromise = Q(10);
        const rejectedPromise = Q.reject(new Error("Test error"));
        expect(Q.isRejected(fulfilledPromise)).toBe(false);
        expect(Q.isRejected(rejectedPromise)).toBe(true);
        // If the mutation is applied, this test will fail
        expect(Q.isRejected(fulfilledPromise)).not.toBe(true);
    });
});