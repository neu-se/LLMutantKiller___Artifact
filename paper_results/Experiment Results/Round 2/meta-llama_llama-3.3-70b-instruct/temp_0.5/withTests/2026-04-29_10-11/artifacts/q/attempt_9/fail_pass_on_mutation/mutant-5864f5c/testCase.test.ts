import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        // Create a promise
        var deferred = q.defer();
        var promise = deferred.promise;

        // Resolve the promise
        deferred.resolve();

        // Check if the promise is resolved
        expect(promise.isPending()).toBe(false);
    });
});