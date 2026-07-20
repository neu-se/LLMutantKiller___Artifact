import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should call the progress listener', () => {
        let threw = false;
        var deferred = Q.defer();
        var promise = deferred.promise.then(
            function () {
                expect(threw).toBe(false);
            },
            function () {
                expect(true).toBe(false);
            },
            function () {
                threw = true;
            }
        );

        deferred.notify();
        deferred.resolve();

        return promise;
    });
});