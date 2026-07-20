import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then", function () {
    it("should call the progress callback with the progress value", function () {
        var deferred = Q.defer();
        var progressed = false;

        Q.when(deferred.promise, function(value: any) {
            return value;
        }, null, function (progress: any) {
            progressed = true;
            return false;
        })
        .then(function (value: any) {
            expect(progressed).toBe(true);
            expect(value).toBe(10);
        });

        deferred.notify(10);
        deferred.resolve(10);
    });
});