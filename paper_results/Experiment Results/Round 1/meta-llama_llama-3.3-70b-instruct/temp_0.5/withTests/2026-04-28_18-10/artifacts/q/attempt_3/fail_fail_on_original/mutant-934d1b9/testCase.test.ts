import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('defer', () => {
    it('should resolve the promise when become is called', () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        var resolved = false;

        promise.then(function () {
            resolved = true;
        });

        var becomeCalled = false;
        var become = function(newPromise) {
            becomeCalled = true;
            deferred.resolve(newPromise);
        };

        become(Q.resolve());
        expect(becomeCalled).toBe(true);
        return promise.then(function () {
            expect(resolved).toBe(true);
        });
    });
});