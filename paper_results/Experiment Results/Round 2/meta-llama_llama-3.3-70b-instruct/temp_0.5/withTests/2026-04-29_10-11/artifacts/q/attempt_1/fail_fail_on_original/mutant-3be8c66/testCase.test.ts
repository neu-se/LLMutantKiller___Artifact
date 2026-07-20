import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.isFulfilled', function () {
    it('should return true for a fulfilled promise', function () {
        var promise = Q(10);
        expect(Q.isFulfilled(promise)).toBe(true);
    });

    it('should return false for a rejected promise', function () {
        var error = new Error("Oh, snap.");
        var promise = Q.reject(error);
        expect(Q.isFulfilled(promise)).toBe(false);
    });

    it('should return false for a pending promise', function () {
        var deferred = Q.defer();
        var promise = deferred.promise;
        expect(Q.isFulfilled(promise)).toBe(false);
    });
});