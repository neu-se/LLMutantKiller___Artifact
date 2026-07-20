import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('when function', function () {
    it('should call the callback with the resolved value', function (done) {
        var deferred = Q.defer();
        var value = 'test';
        Q.when(deferred.promise, function (resolvedValue) {
            expect(resolvedValue).toBe(value);
            done();
        });
        deferred.resolve(value);
    });
});