import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', function () {
    it('should reject with an error when all promises are rejected', function () {
        var deferred1 = Q.defer();
        var deferred2 = Q.defer();

        var promise = Q.any([deferred1.promise, deferred2.promise]);

        deferred1.reject(new Error('Error 1'));
        deferred2.reject(new Error('Error 2'));

        return promise.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('Q can\'t get fulfillment value from any promise, all promises were rejected. Last error message: Error: Error 2');
        });
    });
});