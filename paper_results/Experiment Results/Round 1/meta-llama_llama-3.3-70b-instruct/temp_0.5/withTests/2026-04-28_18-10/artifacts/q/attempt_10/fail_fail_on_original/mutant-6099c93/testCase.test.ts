import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('unhandled rejection tracking', () => {
    it('should report unhandled rejections', () => {
        Q.resetUnhandledRejections();
        var deferred = Q.defer();
        var promise = deferred.promise;
        var reason = new Error("Test reason");
        Q.trackRejection(promise, reason);
        var atReport = 0;
        Q.nextTick.runAfter(function () {
            if (atReport !== -1) {
                Q.untrackRejection(promise);
                expect(Q.getUnhandledReasons().length).toBe(0);
            }
        });
        expect(atReport).toBe(0);
    });
});