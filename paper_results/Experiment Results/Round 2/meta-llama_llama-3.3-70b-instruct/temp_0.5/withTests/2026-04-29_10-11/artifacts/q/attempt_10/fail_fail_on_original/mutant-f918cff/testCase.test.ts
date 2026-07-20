import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should reject with an error when an exception is thrown in the promise dispatch', () => {
        var deferred = Q.defer();
        deferred.reject("Test error");
        return deferred.promise.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error).toBe("Test error");
        });
    });
});