import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', function () {
    it('should fulfill with the first resolved promise when one of the promises is not a promise', function () {
        var deferred = Q.defer();
        var promises = [deferred.promise, 'not a promise'];

        var promise = Q.any(promises);

        deferred.resolve('Fulfilled');

        return promise.then(function(value) {
            expect(value).toBe('not a promise');
        });
    });
});