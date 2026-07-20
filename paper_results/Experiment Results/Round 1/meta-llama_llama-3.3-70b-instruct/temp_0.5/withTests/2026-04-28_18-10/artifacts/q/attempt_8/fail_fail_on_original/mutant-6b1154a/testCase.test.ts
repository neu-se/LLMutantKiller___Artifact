describe("Q.done", () => {
    it("should call the callback and return nothing when the promise is fulfilled", () => {
        const Q = require('../../../../../../../q/q.js');
        var promise = Q(10);
        var called = false;
        promise.then(() => {
            called = true;
        });
        promise.done(() => {
            expect(called).toBe(true);
        });
    });
});