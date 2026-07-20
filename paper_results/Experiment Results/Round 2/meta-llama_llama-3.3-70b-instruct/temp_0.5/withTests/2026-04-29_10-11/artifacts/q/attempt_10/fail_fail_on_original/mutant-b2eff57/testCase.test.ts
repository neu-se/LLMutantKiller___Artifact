import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', function () {
    it('should reject with the last rejection reason when all promises are rejected', function () {
        var deferred1 = Q.defer();
        var deferred2 = Q.defer();

        var promise = Q.any([deferred1.promise, deferred2.promise]);

        var error1 = new Error('Error 1');
        var error2 = new Error('Error 2');

        deferred1.reject(error1);
        deferred2.reject(error2);

        return promise.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error).toBe(error2);
        });
    });
});