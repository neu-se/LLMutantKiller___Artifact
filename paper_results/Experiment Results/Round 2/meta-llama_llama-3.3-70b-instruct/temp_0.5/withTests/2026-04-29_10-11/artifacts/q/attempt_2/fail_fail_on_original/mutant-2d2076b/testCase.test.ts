import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.delay', function () {
    it('should delay fulfillment', function () {
        var deferred = Q.defer();
        Q.delay(deferred.promise, 50).then(function (value) {
            expect(value).toBeUndefined();
        });
        deferred.resolve();
    });

    it('should not delay rejection', function () {
        var deferred = Q.defer();
        var error = new Error("haha!");
        Q.delay(deferred.promise, 50).then(function () {
            expect(true).toBe(false);
        }, function (_error) {
            expect(_error).toBe(error);
        });
        deferred.reject(error);
    });
});