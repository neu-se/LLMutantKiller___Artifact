import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.all', function() {
    it('should reject when any promise in the array is rejected', function() {
        var promise1 = Q.resolve(1);
        var promise2 = Q.reject('error');
        return Q.all([promise1, promise2]).then(function(values) {
            expect(true).toBe(false);
        }, function(reason) {
            expect(reason).toBe('error');
        });
    });

    it('should resolve when all promises in the array are resolved', function() {
        var promise1 = Q.resolve(1);
        var promise2 = Q.resolve(2);
        return Q.all([promise1, promise2]).then(function(values) {
            expect(values).toEqual([1, 2]);
        });
    });
});