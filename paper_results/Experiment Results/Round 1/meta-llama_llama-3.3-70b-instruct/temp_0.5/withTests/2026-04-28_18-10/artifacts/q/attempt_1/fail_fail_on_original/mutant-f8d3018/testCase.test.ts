import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should handle progress callbacks", () => {
        var progressValues = [];
        var deferred = Q.defer();
        var promise = deferred.promise.then(
            function () {
                expect(progressValues).toEqual([1, 2]);
            },
            function () {
                expect(true).toBe(false);
            },
            function (progressValue) {
                progressValues.push(progressValue);
            }
        );

        deferred.notify(1);
        deferred.notify(2);
        deferred.resolve();

        return promise;
    });
});