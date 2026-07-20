describe("Promise.prototype.then", () => {
    it("should not call the rejected callback when the promise is fulfilled and done flag is set to true", () => {
        const Q = require('../../../../q.js');
        let rejectedCalled = false;
        const promise = Q(10);
        promise.then(() => {}, () => {
            rejectedCalled = true;
        });
        return promise.then(() => {
            expect(rejectedCalled).toBe(false);
        });
    });
});