describe("Promise.prototype.then", () => {
    it("should call the fulfilled callback when the promise is resolved", () => {
        const Q = require('../../../../q.js');
        let fulfilled = false;
        Q(10).then(() => {
            fulfilled = true;
        });
        return Q.delay(10).then(() => {
            expect(fulfilled).toBe(true);
        });
    });
});