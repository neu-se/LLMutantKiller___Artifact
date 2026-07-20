import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.any", () => {
    it("should call progress listener with progress values", () => {
        var deferred1 = Q.defer();
        var deferred2 = Q.defer();

        var progressValues = [];
        var promise = Q.any([deferred1.promise, deferred2.promise]).then(
            function () {
                expect(progressValues).toEqual([{ index: 0, value: "a" }, { index: 1, value: "b" }]);
            },
            undefined,
            function (progressValue) {
                progressValues.push(progressValue);
            }
        );

        Q.delay(50).then(function () {
            deferred1.notify("a");
        });
        Q.delay(100).then(function () {
            deferred2.notify("b");
            deferred2.resolve();
        });
        Q.delay(150).then(function () {
            deferred1.notify("c"); // Is lost, deferred2 already resolved.
            deferred1.resolve();
        });

        return promise;
    });
});