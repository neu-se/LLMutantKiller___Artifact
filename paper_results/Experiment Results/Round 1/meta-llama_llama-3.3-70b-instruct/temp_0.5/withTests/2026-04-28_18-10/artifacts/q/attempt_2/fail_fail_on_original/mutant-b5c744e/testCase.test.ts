import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.all', function() {
    it('should reject with a meaningful error when any promise is rejected', function() {
        var promise1 = Q.resolve(1);
        var promise2 = Q.reject(new Error('Test error'));
        return Q.all([promise1, promise2]).then(function(values) {
            expect(true).toBe(false);
        }, function(reason) {
            expect(reason.message).toBe('Test error');
        });
    });
});