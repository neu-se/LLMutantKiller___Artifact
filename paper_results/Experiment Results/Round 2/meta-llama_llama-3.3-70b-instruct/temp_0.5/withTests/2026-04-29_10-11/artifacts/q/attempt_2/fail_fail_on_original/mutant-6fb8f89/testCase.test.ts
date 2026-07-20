import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.all", () => {
    it("should resolve with an array of values when all promises are resolved", () => {
        var promise1 = Q(1);
        var promise2 = Q(2);
        return Q.all([promise1, promise2]).then(function(values) {
            expect(values).toEqual([1, 2]);
        });
    });

    it("should reject with the reason of the first promise that is rejected", () => {
        var promise1 = Q(1);
        var promise2 = Q.reject("error");
        return Q.all([promise1, promise2]).then(function(values) {
            expect(true).toBe(false);
        }, function(reason) {
            expect(reason).toBe("error");
        });
    });

    it("should call the callback with the correct values when all promises are resolved", () => {
        var promise1 = Q(1);
        var promise2 = Q(2);
        var promise = Q.all([promise1, promise2]).then(function(values) {
            expect(values).toEqual([1, 2]);
        });
        return promise;
    });
});