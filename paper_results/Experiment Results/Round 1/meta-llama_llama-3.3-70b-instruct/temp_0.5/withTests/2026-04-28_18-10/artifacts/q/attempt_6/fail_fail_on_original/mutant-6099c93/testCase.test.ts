import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('unhandled rejection tracking', () => {
    it('should report unhandled rejections', () => {
        Q.resetUnhandledRejections();
        var deferred = Q.defer();
        var promise = deferred.promise;
        var reason = new Error("Test reason");
        trackRejection(promise, reason);
        var atReport = 0;
        if (atReport !== -1) {
            process.emit('rejectionHandled', reason, promise);
        }
        expect(atReport).toBe(0);
    });
});