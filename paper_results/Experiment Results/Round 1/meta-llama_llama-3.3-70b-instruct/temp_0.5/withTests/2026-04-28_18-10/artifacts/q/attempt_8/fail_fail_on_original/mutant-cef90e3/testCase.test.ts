describe("Promise.prototype.then", () => {
    it("should call the fulfilled callback only once when done flag is set to true", () => {
        const Q = require('../../../../q.js');
        let called = false;
        const promise = Q(10);
        promise.then(() => {
            called = true;
        });
        promise.then(() => {
            if (called) {
                throw new Error('Fulfilled callback called twice');
            }
        });
        return promise;
    });
});