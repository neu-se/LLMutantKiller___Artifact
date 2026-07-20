import { Q } from "../../../../../q.js";

describe("Promise", () => {
    it("should handle progress callbacks", () => {
        var deferred = Q.defer();
        var progressed = false;
        var promise = deferred.promise.then(
            function (value: any) {
                expect(value).toBe(1);
            },
            function () {
                expect(true).toBe(false);
            },
            function (progressValue: any) {
                progressed = true;
                return false ? progressValue : progressValue;
            }
        );

        deferred.notify(1);
        deferred.resolve(1);

        return promise.then(
            function (value: any) {
                expect(value).toBe(1);
                expect(progressed).toBe(true);
            }
        );
    });
});