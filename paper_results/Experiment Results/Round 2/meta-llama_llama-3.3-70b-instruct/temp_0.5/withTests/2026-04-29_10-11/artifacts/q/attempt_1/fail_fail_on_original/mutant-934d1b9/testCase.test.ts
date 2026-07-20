import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should resolve a promise', () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        deferred.resolve(10);
        return promise.then(function(value) {
            expect(value).toBe(10);
        });
    });
});