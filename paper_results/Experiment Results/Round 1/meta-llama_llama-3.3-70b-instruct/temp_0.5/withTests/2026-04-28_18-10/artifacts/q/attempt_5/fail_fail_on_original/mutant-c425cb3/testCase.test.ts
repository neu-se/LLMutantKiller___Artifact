import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should call the progress listener only when not threw', () => {
        var deferred = Q.defer();
        var threw = false;

        var promise = deferred.promise.then(
            function () {
                expect(threw).toBe(false);
            },
            function () {
                expect(true).toBe(false);
            },
            function () {
                if (!threw) {
                    threw = true;
                }
            }
        );

        deferred.notify();
        deferred.resolve();

        return promise;
    });
});