import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.all', function() {
    it('should handle an array of promises', function() {
        var promise1 = Q.resolve(1);
        var promise2 = Q.resolve(2);
        return Q.all([promise1, promise2]).then(function(values) {
            expect(values).toEqual([1, 2]);
        });
    });
});