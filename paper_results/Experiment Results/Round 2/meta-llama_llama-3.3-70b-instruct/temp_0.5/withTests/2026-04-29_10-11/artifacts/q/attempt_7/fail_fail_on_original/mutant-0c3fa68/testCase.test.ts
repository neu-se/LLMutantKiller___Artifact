import { Q } from "../../../../../q";

describe("Q progress function", () => {
    it("should call the progress callback when progress function is defined", () => {
        var progressed = false;
        var deferred = Q.defer();

        Q.progress(deferred.promise, () => {
            progressed = true;
        });

        deferred.notify();
        deferred.resolve();

        return deferred.promise.then(() => {
            expect(progressed).toBe(true);
        });
    });
});