import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should call the promiseDispatch with the correct operation', () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        var called = false;

        promise.promiseDispatch = function(resolve, op, args) {
            if (op === "when") {
                called = true;
            }
        };

        Q.when(promise, function() {});

        expect(called).toBe(true);
    });
});