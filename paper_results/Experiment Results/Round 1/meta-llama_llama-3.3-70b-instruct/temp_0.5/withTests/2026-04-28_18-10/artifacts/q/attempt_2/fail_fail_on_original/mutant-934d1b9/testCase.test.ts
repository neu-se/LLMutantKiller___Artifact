import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('defer', () => {
    it('should resolve the promise when become is called with a truthy condition', () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        var resolved = false;

        promise.then(function () {
            resolved = true;
        });

        if (true) {
            deferred.resolve();
        }

        return promise.then(function () {
            expect(resolved).toBe(true);
        });
    });

    it('should not resolve the promise when become is called with a falsy condition', () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        var resolved = false;

        promise.then(function () {
            resolved = true;
        });

        if (false) {
            deferred.resolve();
        }

        return promise.then(function () {
            expect(resolved).toBe(false);
        });
    });
});