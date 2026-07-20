describe('Q', () => {
    it('should return a pending promise when given no value', () => {
        const Q = require('../../../../q'); // Import Q from the correct path
        const promise = Q.defer().promise;
        expect(promise.inspect()).toEqual({ state: "pending" });
    });
});