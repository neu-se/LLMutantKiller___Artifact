import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.all", () => {
    it("should reject when any promise is rejected with an error", () => {
        var promise1 = Q(1);
        var promise2 = Q.reject(new Error("Test Error"));
        return Q.all([promise1, promise2]).then(function () {
            expect(true).toBe(false);
        }, function (error: any) {
            expect(error.message).toBe("Test Error");
        });
    });
});