import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q function", () => {
    it("should handle progress notifications", () => {
        var deferred = Q.defer();
        var progressValues = [];

        var promise = Q.when(
            deferred.promise,
            function () {
                expect(progressValues).toEqual([1]);
            },
            function () {
                expect(true).toBe(false);
            },
            function (value) {
                progressValues.push(value);
            }
        );

        deferred.notify(1);
        deferred.resolve();

        return promise;
    });
});