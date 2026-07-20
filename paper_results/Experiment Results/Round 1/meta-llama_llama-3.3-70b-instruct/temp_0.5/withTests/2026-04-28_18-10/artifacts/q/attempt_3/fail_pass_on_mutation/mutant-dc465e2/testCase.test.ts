import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle timeout', () => {
        var deferred = Q.defer();
        var promise = deferred.promise.timeout(10, "Timeout");

        promise.then(
            function () {
                throw new Error("This should not be called");
            },
            function (error: any) {
                expect(error.message).toBe("Timeout");
            }
        );

        Q.nextTick(function () {
            deferred.resolve();
        });
    });
});