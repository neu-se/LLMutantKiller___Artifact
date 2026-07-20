describe("Q function", () => {
    it("should check if a promise is fulfilled", () => {
        const Q = require('../../../../../q');
        const promise = Q(5);
        expect(promise.isFulfilled()).toBe(true);
        const rejectedPromise = Q.reject(new Error());
        expect(rejectedPromise.isFulfilled()).toBe(false);
    });
});