import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', function () {
    it('should reject the promise when an exception is thrown in the promise dispatch', function () {
        var deferred = Q.defer();
        var promise = deferred.promise;
        deferred.reject("Test error");
        return promise.catch(function (error) {
            expect(error).toBe("Test error");
        });
    });
});