import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should call the progress listener with the notify values', () => {
        var deferred = q.defer();
        var progressValues: any[] = [];

        var promise = q.when(
            deferred.promise,
            function () {
                expect(progressValues).toEqual([1]);
            },
            function () {
                expect(true).toBe(false);
            },
            function (value: any) {
                progressValues.push(value);
            }
        );

        deferred.notify(1);
        deferred.resolve();

        return promise;
    });
});