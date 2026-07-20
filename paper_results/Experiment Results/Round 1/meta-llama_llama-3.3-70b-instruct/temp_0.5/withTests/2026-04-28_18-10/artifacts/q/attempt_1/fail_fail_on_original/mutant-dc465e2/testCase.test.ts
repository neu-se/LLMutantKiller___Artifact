import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle timeout', () => {
        var deferred = Q.defer();
        var promise = deferred.promise.timeout(10, "Timeout");
        var timeoutId: any;
        var error: any;

        Q.nextTick(function () {
            timeoutId = setTimeout(function () {
                deferred.resolve();
            }, 20);
        });

        promise.then(function (value) {
            expect(value).toBeUndefined();
        }, function (_error) {
            error = _error;
        });

        Q.nextTick(function () {
            expect(promise.isPending()).toBe(true);
            expect(error).toBeUndefined();
        });

        Q.nextTick(function () {
            expect(promise.isPending()).toBe(false);
            expect(error).not.toBeUndefined();
            expect(error.message).toBe("Timeout");
        });
    });
});