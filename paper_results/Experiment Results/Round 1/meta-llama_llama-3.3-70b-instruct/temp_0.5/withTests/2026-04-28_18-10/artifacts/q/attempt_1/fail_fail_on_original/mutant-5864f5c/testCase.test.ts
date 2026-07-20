import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle StopIteration exception correctly", () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        var error = new QReturnValue();
        deferred.reject(error);
        return promise.then(null, function (exception) {
            expect(exception).toBe(error);
        });
    });
});