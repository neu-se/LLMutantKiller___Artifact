describe("Q function", () => {
    it("should check if a promise is fulfilled", () => {
        const Q = require('../../../../q.js');
        const promise = Q(5);
        expect(promise.isFulfilled()).toBe(true);
    });
});