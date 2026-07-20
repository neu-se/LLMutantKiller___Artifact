import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.all", () => {
    it("should resolve when all promises are resolved", () => {
        var promise1 = Q(1);
        var promise2 = Q(2);
        return Q.all([promise1, promise2]).then(function (values) {
            expect(values).toEqual([1, 2]);
        });
    });

    it("should reject when any promise is rejected", () => {
        var promise1 = Q(1);
        var promise2 = Q.reject("error");
        return Q.all([promise1, promise2]).then(function () {
            expect(true).toBe(false);
        }, function (reason) {
            expect(reason).toBe("error");
        });
    });
});