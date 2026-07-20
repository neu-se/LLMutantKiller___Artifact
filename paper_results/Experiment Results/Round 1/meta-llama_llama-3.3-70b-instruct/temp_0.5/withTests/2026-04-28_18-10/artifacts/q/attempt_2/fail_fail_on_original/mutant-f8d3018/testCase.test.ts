import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should handle progress callbacks", () => {
        var progressValues: any[] = [];
        var deferred = Q.defer();
        var promise = deferred.promise.then(
            function () {
                expect(progressValues).toEqual([1]);
            },
            function () {
                expect(true).toBe(false);
            },
            function (progressValue: any) {
                return progressValue;
            }
        );

        deferred.notify(1);
        deferred.resolve();

        return promise;
    });
});