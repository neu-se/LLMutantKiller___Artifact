import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", function () {
    it("should reject when all promises are rejected", function () {
        var deferred1 = Q.defer();
        var deferred2 = Q.defer();
        var promises = [deferred1.promise, deferred2.promise];
        var promise = Q.any(promises);

        deferred1.reject("error1");
        deferred2.reject("error2");

        return promise.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: error2");
        });
    });
});