import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.isPending", () => {
    it("should return true for pending promises and false for non-pending promises", () => {
        const pendingPromise = Q.defer().promise;
        const fulfilledPromise = Q.resolve("fulfilled");
        const rejectedPromise = Q.reject("rejected");

        expect(Q.isPending(pendingPromise)).toBe(true);
        expect(Q.isPending(fulfilledPromise)).toBe(false);
        expect(Q.isPending(rejectedPromise)).toBe(false);

        // Test for mutation
        expect(Q.isPending(pendingPromise)).toBeTruthy();
        expect(Q.isPending(fulfilledPromise)).toBeFalsy();
        expect(Q.isPending(rejectedPromise)).toBeFalsy();
    });
});