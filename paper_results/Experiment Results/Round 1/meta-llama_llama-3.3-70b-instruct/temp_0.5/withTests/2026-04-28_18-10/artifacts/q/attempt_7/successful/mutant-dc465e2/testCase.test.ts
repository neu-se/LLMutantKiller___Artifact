import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle timeout', async () => {
        var deferred = Q.defer();
        var promise = deferred.promise.timeout(10, "Timeout");

        Q.nextTick(function () {
            deferred.resolve();
        });

        await promise;
    });
});