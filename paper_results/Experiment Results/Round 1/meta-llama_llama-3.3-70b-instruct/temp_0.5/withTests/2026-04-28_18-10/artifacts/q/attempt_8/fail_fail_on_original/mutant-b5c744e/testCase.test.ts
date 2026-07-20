import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.all', function() {
    it('should call the onFulfilled callback with the correct values', function() {
        var promise1 = Q.resolve(1);
        var promise2 = Q.resolve(2);
        var onFulfilledCalled = false;
        return Q.all([promise1, promise2]).then(function(values) {
            expect(values).toEqual([1, 2]);
            onFulfilledCalled = true;
        }).then(function() {
            expect(onFulfilledCalled).toBe(true);
        });
    });
});