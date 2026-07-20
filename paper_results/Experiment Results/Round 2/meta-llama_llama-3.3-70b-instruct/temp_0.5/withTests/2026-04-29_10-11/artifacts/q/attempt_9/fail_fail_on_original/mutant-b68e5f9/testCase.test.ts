describe('promise nodeify', () => {
    it('should call the callback with the resolution value when the promise is fulfilled', () => {
        const Q = require('../../../../q');
        const promise = Q(10);
        let callbackCalled = false;
        promise.nodeify((err, value) => {
            expect(err).toBeNull();
            expect(value).toBe(10);
            callbackCalled = true;
        });
        expect(callbackCalled).toBe(true);
    });
});