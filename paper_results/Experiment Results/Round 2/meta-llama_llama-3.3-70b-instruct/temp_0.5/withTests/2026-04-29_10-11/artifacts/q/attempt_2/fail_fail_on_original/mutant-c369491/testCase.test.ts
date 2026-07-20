import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call the progress listener", () => {
        var progressed = false;
        var deferred = Q.defer();
        var promise = Q.when(deferred.promise, function () {
            expect(progressed).toBe(true);
        }, function () {
            expect(true).toBe(false);
        }, function () {
            progressed = true;
        });

        deferred.notify();
        deferred.resolve();

        return promise;
    });
});