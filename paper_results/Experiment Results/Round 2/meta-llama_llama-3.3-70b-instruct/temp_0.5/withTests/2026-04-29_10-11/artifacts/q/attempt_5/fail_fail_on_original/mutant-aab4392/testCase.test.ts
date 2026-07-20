import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should reject when one of the promises is rejected", () => {
        var promise1 = Q.resolve(1);
        var promise2 = Q.reject("Error");
        var promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then(function(values) {
            expect(true).toBe(false);
        }, function(error) {
            expect(error).toBe("Error");
        });
    });
});