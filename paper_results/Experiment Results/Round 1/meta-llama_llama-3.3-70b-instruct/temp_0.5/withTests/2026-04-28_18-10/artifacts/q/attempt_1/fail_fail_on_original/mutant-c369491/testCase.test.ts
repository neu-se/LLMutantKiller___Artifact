import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should call the progress listener with the correct context', () => {
        var progressed = false;
        var progressContext = {};
        var deferred = Q.defer();
        var promise = Q.when(deferred.promise, function () {
            expect(progressed).toBe(true);
            expect(progressContext).toBe(calledAsFunctionThis);
        }, function () {
            expect(true).toBe(false);
        }, function () {
            progressed = true;
            progressContext = this;
        });

        deferred.notify();
        deferred.resolve();

        return promise;
    });
});