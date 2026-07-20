import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nearer", function () {
    it("should return the inspected value of a fulfilled promise", function () {
        var deferred = Q.defer();
        deferred.resolve(10);
        return Q.nearer(deferred.promise).then(function (value) {
            expect(value).toBe(10);
        });
    });

    it("should return undefined for a pending promise", function () {
        var deferred = Q.defer();
        return Q.nearer(deferred.promise).then(function (value) {
            expect(value).toBeUndefined();
        });
    });

    it("should return undefined for a rejected promise", function () {
        var deferred = Q.defer();
        deferred.reject(new Error("Test"));
        return Q.nearer(deferred.promise).then(function (value) {
            expect(value).toBeUndefined();
        });
    });
});