import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should become a resolved promise when resolved', () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        deferred.resolve(10);
        return promise.then(function(value) {
            expect(value).toBe(10);
            var deferred2 = Q.defer();
            var promise2 = deferred2.promise;
            deferred2.resolve();
            return promise2;
        }).then(function() {
            expect(true).toBe(true);
        });
    });
});