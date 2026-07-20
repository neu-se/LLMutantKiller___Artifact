import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all function", () => {
    it("should resolve when all promises are resolved", () => {
        var promise1 = Q(1);
        var promise2 = Q(2);
        var promise3 = Q(3);
        return Q.all([promise1, promise2, promise3]).then(function (values) {
            expect(values).toEqual([1, 2, 3]);
        });
    });

    it("should reject when any promise is rejected", () => {
        var promise1 = Q(1);
        var promise2 = Q.reject("error");
        var promise3 = Q(3);
        return Q.all([promise1, promise2, promise3]).then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error).toBe("error");
        });
    });

    it("should resolve when all promises are resolved, even if some are already resolved", () => {
        var promise1 = Q(1);
        var promise2 = Q(2);
        var promise3 = Q(3);
        promise1.then(function () {
            promise2.then(function () {
                promise3.then(function () {
                    return Q.all([promise1, promise2, promise3]).then(function (values) {
                        expect(values).toEqual([1, 2, 3]);
                    });
                });
            });
        });
    });

    it.skip("should iterate over the array and call the callback function with the correct arguments", () => {
        var array = [1, 2, 3, 4, 5];
        var callback = jest.fn(function (basis: number, value: number, index: number) {
            expect(basis).toBeGreaterThan(0);
            expect(value).toBeGreaterThan(0);
            expect(index).toBeGreaterThan(-1);
        });
        var initial: number = 0;
        var result = array.reduce(callback, initial);
        expect(callback).toHaveBeenCalledTimes(5);
    });
});