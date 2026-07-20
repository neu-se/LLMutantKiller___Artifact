import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('defer and when', () => {
    it('observers called even after throw', () => {
        var threw = false;
        var deferred = Q.defer();
        Q.when(deferred.promise, function () {
            threw = true;
            throw new Error("In your face.");
        }, function () {
            expect(threw).toBe(true);
        });
        var promise = Q.when(deferred.promise, function (value) {
            expect(true).toBe(false);
        }, function () {
            expect(true).toBe(false);
        });
        deferred.resolve(10);
        return promise;
    });
});