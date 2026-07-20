import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q progress function", () => {
    it("should call the progress callback", () => {
        var progressed = false;
        var deferred = Q.defer();

        Q.progress(deferred.promise, function () {
            progressed = true;
        });

        deferred.notify();
        deferred.resolve();

        return deferred.promise.then(function () {
            expect(progressed).toBe(true);
        });
    });

    it("should not call the progress callback when progress function is empty", () => {
        var progressed = false;
        var deferred = Q.defer();

        Q.progress(deferred.promise, function () {});

        deferred.notify();
        deferred.resolve();

        return deferred.promise.then(function () {
            expect(progressed).toBe(false);
        });
    });
});