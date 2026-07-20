import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isPending", function () {
    it("should return false for a non-promise value", function () {
        expect(Q.isPending(10)).toBe(false);
    });

    it("should return false for a fulfilled promise", function () {
        var promise = Q(10);
        expect(promise.isPending()).toBe(false);
    });

    it("should return true for a pending promise", function () {
        var deferred = Q.defer();
        expect(deferred.promise.isPending()).toBe(true);
    });
});