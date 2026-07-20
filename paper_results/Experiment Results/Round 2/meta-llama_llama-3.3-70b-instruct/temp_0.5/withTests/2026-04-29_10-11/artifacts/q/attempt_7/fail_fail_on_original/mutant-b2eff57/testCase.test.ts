import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', function () {
    it('should reject with an error when all promises are rejected and at least one rejection reason is null or undefined', function () {
        var deferred1 = Q.defer();
        var deferred2 = Q.defer();

        var promise = Q.any([deferred1.promise, deferred2.promise]);

        deferred1.reject(null);
        deferred2.reject(undefined);

        return promise.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error).toBeInstanceOf(Error);
        });
    });
});