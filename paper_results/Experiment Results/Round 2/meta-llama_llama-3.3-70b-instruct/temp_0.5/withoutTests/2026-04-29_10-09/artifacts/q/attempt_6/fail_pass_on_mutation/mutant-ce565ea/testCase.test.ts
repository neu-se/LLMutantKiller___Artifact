import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return a value when the promise is fulfilled', () => {
        const deferred = Q.defer();
        deferred.resolve(5);
        const promise = deferred.promise;
        expect(promise.valueOf()).toBe(5);
    });
});