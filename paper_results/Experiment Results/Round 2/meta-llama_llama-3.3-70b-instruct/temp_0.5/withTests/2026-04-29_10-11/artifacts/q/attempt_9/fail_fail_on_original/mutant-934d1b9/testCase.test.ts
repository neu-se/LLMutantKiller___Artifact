import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should resolve a promise with become method', () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        var becomeCalled = false;
        deferred.become = function(newPromise) {
            becomeCalled = true;
        };
        deferred.resolve(10);
        return promise.then(function(value) {
            expect(value).toBe(10);
            expect(becomeCalled).toBe(true);
        });
    });
});