import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should call progress listener with progress values", () => {
        var deferred1 = Q.defer();
        var deferred2 = Q.defer();

        var progressValues: any[] = [];
        var promise = Q.any([deferred1.promise, deferred2.promise]).then(
            function (value: any) {
                expect(value).toBe("resolved");
            },
            function (reason: any) {
                expect(reason).toBe("rejected");
            },
            function (progressValue: any) {
                progressValues.push(progressValue);
                expect(progressValue).toEqual({ index: 0, value: "a" });
            }
        );

        Q.delay(50).then(function () {
            deferred1.notify("a");
        });
        Q.delay(100).then(function () {
            deferred2.notify("b");
            deferred2.resolve("resolved");
        });
        Q.delay(150).then(function () {
            deferred1.notify("c"); 
            deferred1.resolve();
        });

        return promise;
    });
});