import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected", () => {
    it("should return true for a rejected promise and false for a fulfilled promise", () => {
        const rejectedPromise = Q.reject(new Error());
        const fulfilledPromise = Q(10);
        
        expect(Q.isRejected(rejectedPromise)).toBe(true);
        expect(Q.isRejected(fulfilledPromise)).toBe(false);
    });
});