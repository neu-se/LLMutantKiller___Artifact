import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should handle progress callbacks", () => {
        var deferred = Q.defer();
        var promise = deferred.promise.then(
            function (value: any) {
                expect(value).toBe(1);
            },
            function () {
                expect(true).toBe(false);
            },
            function (progressValue: any) {
                return typeof progressed === "function" ? progressed(progressValue) : progressValue;
            }
        );

        deferred.notify(1);
        deferred.resolve(1);

        return promise.then(
            function (value: any) {
                expect(value).toBe(1);
            }
        );
    });
});