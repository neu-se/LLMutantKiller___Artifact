import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected function", () => {
    it("should return true for a rejected promise and false for a non-rejected promise", () => {
        const rejectedPromise = q.reject(new Error("Test error"));
        const fulfilledPromise = q(10);
        const pendingPromise = q.defer().promise;

        expect(q.isRejected(rejectedPromise)).toBe(true);
        expect(q.isRejected(fulfilledPromise)).toBe(false);
        expect(q.isRejected(pendingPromise)).toBe(false);
    });
});