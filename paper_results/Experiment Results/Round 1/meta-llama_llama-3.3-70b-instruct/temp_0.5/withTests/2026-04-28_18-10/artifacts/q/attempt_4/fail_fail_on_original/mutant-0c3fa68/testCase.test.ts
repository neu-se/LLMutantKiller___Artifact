import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js"

describe("progress function", () => {
    it("should call the progress callback", () => {
        var progressed = false;
        var deferred = Q.defer();

        Q.progress(deferred.promise, function () {
            progressed = true;
        });

        deferred.notify();
        deferred.resolve();

        return deferred.promise.then(() => {
            expect(progressed).toBe(true);
        });
    });
});