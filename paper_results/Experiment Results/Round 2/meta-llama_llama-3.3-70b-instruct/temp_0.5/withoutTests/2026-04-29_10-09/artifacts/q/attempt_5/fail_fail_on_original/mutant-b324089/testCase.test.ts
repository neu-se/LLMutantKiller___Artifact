describe('Q', () => {
    it('nearer function should return the fulfillment value of a fulfilled promise', () => {
        const Q = require('./q.js');
        const promise = Q(42);
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            expect(Q.nearer(promise)).toBe(inspected.value);
        } else {
            expect(false).toBe(true); // This should not happen if the promise is fulfilled
        }
    });
});