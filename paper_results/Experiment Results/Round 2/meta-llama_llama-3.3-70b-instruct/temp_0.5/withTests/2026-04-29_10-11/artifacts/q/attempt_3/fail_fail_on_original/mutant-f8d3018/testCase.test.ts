import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then", function () {
    it("should call the progress callback with the progress value", function () {
        var deferred = Q.defer();
        var progressed = false;

        return Q.when(deferred.promise, null, null, function (value) {
            progressed = true;
            return value;
        })
        .then(function () {
            expect(progressed).toBe(true);
        });

        deferred.notify(10);
        deferred.resolve();
    });
});