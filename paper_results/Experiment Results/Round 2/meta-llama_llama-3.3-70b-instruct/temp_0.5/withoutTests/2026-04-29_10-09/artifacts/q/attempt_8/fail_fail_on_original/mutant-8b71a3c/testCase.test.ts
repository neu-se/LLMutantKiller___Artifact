describe("Q Promise", () => {
    it("should return the promise itself when valueOf is called on a pending promise", () => {
        const Q = require('./q');
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        if (inspected.state === "pending") {
            expect(promise.valueOf()).not.toBe(promise);
        } else {
            throw new Error("Promise is not pending");
        }
    });
});