import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', function () {
    it('should reject with an error message when all promises are rejected and at least one rejection reason is not null or undefined', function () {
        var deferred1 = Q.defer();
        var deferred2 = Q.defer();

        var promise = Q.any([deferred1.promise, deferred2.promise]);

        deferred1.reject(new Error('Error 1'));
        deferred2.reject(new Error('Error 2'));

        return promise.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error).toBeInstanceOf(Error);
        });
    });
});