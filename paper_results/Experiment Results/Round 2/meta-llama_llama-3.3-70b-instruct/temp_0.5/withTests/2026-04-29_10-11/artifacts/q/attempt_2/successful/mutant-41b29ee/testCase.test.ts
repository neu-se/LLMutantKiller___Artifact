import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.all', function () {
    it('should resolve when all promises are resolved', function () {
        var promise1 = Q.resolve(1);
        var promise2 = Q.resolve(2);
        var promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then(function (result) {
            expect(result).toEqual([1, 2, 3]);
        });
    });

    it('should reject when any promise is rejected', function () {
        var promise1 = Q.resolve(1);
        var promise2 = Q.reject('error');
        var promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error).toBe('error');
        });
    });
});