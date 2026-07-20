import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", function () {
    it("should reject when all promises are rejected", function () {
        var promises = [Q.reject("error1"), Q.reject("error2")];
        var promise = Q.any(promises);

        return promise.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: error2");
        });
    });
});