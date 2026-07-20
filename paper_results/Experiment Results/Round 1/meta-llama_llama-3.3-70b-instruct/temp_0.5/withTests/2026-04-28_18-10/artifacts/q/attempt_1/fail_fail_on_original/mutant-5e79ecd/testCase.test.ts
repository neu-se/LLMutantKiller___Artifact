import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q done function', () => {
    it('should call the callback and return nothing when the promise is fulfilled', () => {
        var called = false;

        var promise = Q();

        var returnValue = promise.done(function () {
            called = true;
        });

        return promise.fail(function () { }).fin(function () {
            expect(called).toBe(true);
            expect(returnValue).toBe(undefined);
        });
    });

    it('should call the errback and return nothing when the promise is rejected', () => {
        var called = false;

        var promise = Q.reject(new Error());

        var returnValue = promise.done(
            function () { },
            function () {
                called = true;
            }
        );

        return promise.fail(function () { }).fin(function () {
            expect(called).toBe(true);
            expect(returnValue).toBe(undefined);
        });
    });

    it('should attach a progress listener', () => {
        var deferred = Q.defer();

        var spy = jest.fn();
        deferred.promise.done(null, null, spy);

        deferred.notify(10);
        deferred.resolve();

        return deferred.promise.then(function () {
            expect(spy).toHaveBeenCalledWith(10);
        });
    });

    it('should rethrow an error in the next turn if the callback throws', () => {
        var turn = 0;
        Q.nextTick(function () {
            ++turn;
        });

        var returnValue = Q().done(
            function () {
                throw "foo";
            }
        );

        var deferred = Q.defer();
        Q.onerror = function (error) {
            expect(turn).toBe(1);
            expect(error).toBe("foo");
            expect(returnValue).toBe(undefined);
            deferred.resolve();
        };
        Q.delay(100).then(deferred.reject);

        return deferred.promise;
    });

    it('should rethrow an error in the next turn if the errback throws', () => {
        var turn = 0;
        Q.nextTick(function () {
            ++turn;
        });

        var returnValue = Q.reject("bar").done(
            null,
            function () {
                throw "foo";
            }
        );

        var deferred = Q.defer();
        Q.onerror = function (error) {
            expect(turn).toBe(1);
            expect(error).toBe("foo");
            expect(returnValue).toBe(undefined);
            deferred.resolve();
        };
        Q.delay(100).then(deferred.reject);

        return deferred.promise;
    });

    it('should throw the original error in the next turn if there is no errback', () => {
        var turn = 0;
        Q.nextTick(function () {
            ++turn;
        });

        var returnValue = Q.reject("bar").done();

        var deferred = Q.defer();
        Q.onerror = function (error) {
            expect(turn).toBe(1);
            expect(error).toBe("bar");
            expect(returnValue).toBe(undefined);
            deferred.resolve();
        };
        Q.delay(10).then(deferred.reject);

        return deferred.promise;
    });
});