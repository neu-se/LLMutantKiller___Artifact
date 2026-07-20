import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.join", () => {
    it("should resolve when both promises are resolved with the same value", () => {
        var promise1 = Q(1);
        var promise2 = Q(1);
        return Q.join(promise1, promise2).then(function (value) {
            expect(value).toBe(1);
        });
    });

    it("should reject when promises are resolved with different values", () => {
        var promise1 = Q(1);
        var promise2 = Q(2);
        return Q.join(promise1, promise2).then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toBe("Q can't join: not the same: 1 2");
        });
    });
});