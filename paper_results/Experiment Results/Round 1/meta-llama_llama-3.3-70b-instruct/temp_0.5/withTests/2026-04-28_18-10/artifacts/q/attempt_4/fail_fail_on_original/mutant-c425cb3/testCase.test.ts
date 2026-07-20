import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should call the progress listener', () => {
        var deferred = Q.defer();
        var threw = false;

        var promise = deferred.promise.then(
            function () {
                expect(threw).toBe(true);
            },
            function () {
                expect(true).toBe(false);
            },
            function () {
                threw = true;
                throw new Error();
            }
        );

        deferred.notify();
        deferred.resolve();

        return promise;
    });
});