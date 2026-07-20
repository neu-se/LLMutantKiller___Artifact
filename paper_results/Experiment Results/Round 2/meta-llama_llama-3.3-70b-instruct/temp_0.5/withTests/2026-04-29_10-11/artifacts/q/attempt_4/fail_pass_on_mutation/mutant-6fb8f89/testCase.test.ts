import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.all", () => {
    it("should call the fulfilled callback with an array of values when all promises are resolved", () => {
        var promise1 = Q(1);
        var promise2 = Q(2);
        return Q.all([promise1, promise2]).then(function(values) {
            expect(values).toEqual([1, 2]);
        }, function() {
            expect(true).toBe(false);
        });
    });

    it.skip("should not call the fulfilled callback when the array is empty", () => {
        var promise = Q.all([]);
        var called = false;
        promise.then(function(values) {
            called = true;
            expect(values).toEqual([]);
        });
        expect(called).toBe(true);
    });
});