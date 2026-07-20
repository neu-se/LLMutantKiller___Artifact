import { Promise } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.isPending", function () {
    it("should return true for a pending promise and false for a non-pending promise", function () {
        var deferred = Promise.defer();
        expect(deferred.promise.isPending()).toBe(true);
        deferred.resolve();
        expect(deferred.promise.isPending()).toBe(false);
    });
});