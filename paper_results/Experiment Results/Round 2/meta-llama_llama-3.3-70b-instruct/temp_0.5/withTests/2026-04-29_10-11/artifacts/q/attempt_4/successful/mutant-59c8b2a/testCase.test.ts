import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should return a promise with valueOf function that returns the promise's value when resolved", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.resolve(5);
        expect(promise.valueOf()).toBe(5);
    });
});