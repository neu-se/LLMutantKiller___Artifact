import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should call the promiseDispatch with the correct operation', () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        var called = false;

        promise.then(function(value) {
            called = true;
        }, function(reason) {
            expect(true).toBe(false);
        }, function(progress) {
            expect(true).toBe(false);
        });

        deferred.resolve();

        return promise.then(function() {
            expect(called).toBe(true);
            var promiseDispatch = promise.promiseDispatch;
            promise.promiseDispatch = function(resolve, op, args) {
                expect(op).toBe("when");
            };
            Q.when(promise, function() {});
        });
    });
});