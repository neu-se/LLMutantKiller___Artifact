import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q progress function", () => {
    it("should call the progress callback when progress function is defined", () => {
        var progressed = false;
        var deferred = Q.defer();

        Q.progress(deferred.promise, function (value) {
            progressed = true;
            expect(value).toBeUndefined();
        });

        deferred.notify();
        deferred.resolve();

        return deferred.promise.then(function () {
            expect(progressed).toBe(true);
        });
    });
});