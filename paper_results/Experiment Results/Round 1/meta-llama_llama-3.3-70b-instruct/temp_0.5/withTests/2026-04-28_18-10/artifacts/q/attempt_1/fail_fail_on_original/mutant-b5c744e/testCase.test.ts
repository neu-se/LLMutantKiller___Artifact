import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.all', function() {
    it('should resolve when all promises are resolved', function() {
        var promise1 = Q.resolve(1);
        var promise2 = Q.resolve(2);
        return Q.all([promise1, promise2]).then(function(values) {
            expect(values).toEqual([1, 2]);
        });
    });

    it('should reject when any promise is rejected', function() {
        var promise1 = Q.resolve(1);
        var promise2 = Q.reject(2);
        return Q.all([promise1, promise2]).then(function(values) {
            expect(true).toBe(false);
        }, function(reason) {
            expect(reason).toBe(2);
        });
    });

    it('should handle an empty array', function() {
        return Q.all([]).then(function(values) {
            expect(values).toEqual([]);
        });
    });

    it('should handle a sparse array', function() {
        var promises = [];
        promises[0] = Q.resolve(1);
        promises[2] = Q.resolve(3);
        return Q.all(promises).then(function(values) {
            expect(values).toEqual([1, undefined, 3]);
        });
    });
});