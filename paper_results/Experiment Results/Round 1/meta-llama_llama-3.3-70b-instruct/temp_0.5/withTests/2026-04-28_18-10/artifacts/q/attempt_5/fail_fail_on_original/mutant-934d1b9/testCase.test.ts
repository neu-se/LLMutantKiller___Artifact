describe('defer', () => {
    it('should resolve the promise when become is called with a condition that is always true', () => {
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
});