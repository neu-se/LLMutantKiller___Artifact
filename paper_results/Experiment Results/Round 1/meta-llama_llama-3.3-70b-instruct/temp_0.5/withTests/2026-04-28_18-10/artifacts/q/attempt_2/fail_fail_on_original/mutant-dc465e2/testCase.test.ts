import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle timeout', () => {
        var deferred = Q.defer();
        var promise = deferred.promise.timeout(10, "Timeout");

        promise.then(
            function (value) {
                expect(value).toBeUndefined();
            },
            function (error) {
                expect(error.message).toBe("Timeout");
            }
        );

        Q.nextTick(function () {
            deferred.resolve();
        });
    });
});