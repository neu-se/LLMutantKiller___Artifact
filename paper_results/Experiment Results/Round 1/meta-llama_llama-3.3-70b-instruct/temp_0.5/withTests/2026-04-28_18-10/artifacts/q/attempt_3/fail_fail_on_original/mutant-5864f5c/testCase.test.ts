import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle StopIteration exception correctly", () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        var error = new Error();
        error.name = "StopIteration";
        deferred.reject(error);
        return promise.then(null, function (exception) {
            expect(object_toString(exception)).not.toBe("[object QReturnValue]");
        });
    });
});