describe("Q Promise", () => {
    it("should return the promise itself when valueOf is called on a pending promise", () => {
        const Q = require('../../../../q');
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(promise.valueOf()).toBe(promise);
    });
});