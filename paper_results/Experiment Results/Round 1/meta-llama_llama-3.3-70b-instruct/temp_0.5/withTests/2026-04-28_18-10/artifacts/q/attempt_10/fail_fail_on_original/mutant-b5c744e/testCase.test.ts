import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.all', function() {
    it('should resolve with an array of values when all promises are resolved', function() {
        var promise1 = Q.resolve(1);
        var promise2 = Q.resolve(2);
        return Q.all([promise1, promise2]).then(function(values) {
            expect(values).toEqual([1, 2]);
        });
    });

    it('should reject with an error when any promise is rejected', function() {
        var promise1 = Q.resolve(1);
        var promise2 = Q.reject(new Error('Test error'));
        return Q.all([promise1, promise2]).then(function(values) {
            expect(true).toBe(false);
        }, function(error) {
            expect(error.message).toBe('Test error');
        });
    });

    it('should handle an empty array', function() {
        return Q.all([]).then(function(values) {
            expect(values).toEqual([]);
        });
    });
});