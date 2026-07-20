import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then", function () {
    it("should call the progress callback with the progress value", function (done) {
        var deferred = Q.defer();
        var progressValue;

        Q.when(deferred.promise, null, null, function (value) {
            progressValue = value;
        })
        .then(function () {
            expect(progressValue).toBe(10);
            done();
        });

        deferred.notify(10);
        deferred.resolve();
    });
});