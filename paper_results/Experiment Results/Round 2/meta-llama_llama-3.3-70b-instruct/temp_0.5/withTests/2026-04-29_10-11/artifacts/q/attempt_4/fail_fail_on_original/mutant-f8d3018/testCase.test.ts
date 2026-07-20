import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then", function () {
    it("should call the progress callback with the progress value", function () {
        var deferred = Q.defer();
        var progressed = false;

        return Q.when(deferred.promise, function(value) {
            return value;
        }, null, function (progress) {
            progressed = true;
            return progress;
        })
        .then(function (value) {
            expect(progressed).toBe(true);
            expect(value).toBe(10);
        });

        deferred.notify(10);
        deferred.resolve(10);
    });
});