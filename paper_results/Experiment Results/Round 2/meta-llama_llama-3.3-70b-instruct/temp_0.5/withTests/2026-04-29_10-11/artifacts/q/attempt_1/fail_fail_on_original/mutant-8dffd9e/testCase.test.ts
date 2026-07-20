import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isPending", function () {
    it("should return true for a pending promise", function () {
        var deferred = Q.defer();
        expect(Q.isPending(deferred.promise)).toBe(true);
    });

    it("should return false for a fulfilled promise", function () {
        var promise = Q(10);
        expect(Q.isPending(promise)).toBe(false);
    });

    it("should return false for a rejected promise", function () {
        var promise = Q.reject(new Error("Test"));
        expect(Q.isPending(promise)).toBe(false);
    });

    it("should return false for a non-promise value", function () {
        expect(Q.isPending(10)).toBe(false);
    });
});