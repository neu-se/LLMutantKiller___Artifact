describe("Q.isPending", () => {
    it("should return true for pending promises and false for non-pending promises", () => {
        const Q = require('../../../../../q.js');
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

        // Test that pending is not the same as non-pending
        expect(Q.isPending(pendingPromise)).not.toBe(Q.isPending(fulfilledPromise));
        expect(Q.isPending(pendingPromise)).not.toBe(Q.isPending(rejectedPromise));
    });
});