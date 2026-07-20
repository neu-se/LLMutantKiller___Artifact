import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should reject with an error if the given promise is rejected", () => {
        var deferred = q.defer();
        var promise = deferred.promise;
        var error = new Error("Test error");
        deferred.reject(error);
        promise.then(function() {
            expect(true).toBe(false);
        }, function(rejection) {
            expect(rejection).toBe(error);
        });
    });
});