import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should call the progress listener', () => {
        var deferred = Q.defer();
        var progressValues = [];

        var promise = deferred.promise.then(
            function () {
                expect(progressValues).toEqual([1]);
            },
            function () {
                expect(true).toBe(false);
            },
            function (progressValue) {
                progressValues.push(progressValue);
            }
        );

        deferred.notify(1);
        deferred.resolve();

        return promise;
    });
});