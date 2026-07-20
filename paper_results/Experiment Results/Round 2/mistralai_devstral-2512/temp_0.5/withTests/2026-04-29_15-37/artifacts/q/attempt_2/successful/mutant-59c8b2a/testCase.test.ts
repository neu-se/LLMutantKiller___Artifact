const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("promise valueOf behavior", () => {
    it("should return the resolved value when promise is fulfilled", () => {
        const deferred = Q.defer();
        deferred.resolve(42);
        const promise = deferred.promise;
        return promise.then(() => {
            expect(promise.valueOf()).toBe(42);
        });
    });
});