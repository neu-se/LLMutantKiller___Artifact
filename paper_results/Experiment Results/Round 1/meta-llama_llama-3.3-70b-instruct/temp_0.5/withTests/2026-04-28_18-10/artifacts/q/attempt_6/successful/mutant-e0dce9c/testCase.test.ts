import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.valueOf", () => {
    it("should return the promise itself when the promise is pending", () => {
        const deferred = q.defer();
        const promise = deferred.promise;
        expect(promise.valueOf()).toBe(promise);
    });

    it.skip("should return the value when the promise is fulfilled", () => {
        const promise = q(10);
        expect(promise.valueOf()).toBe(10);
    });

    it("should return the promise itself when the promise is rejected", () => {
        const promise = q.reject(new Error("Test"));
        expect(promise.valueOf()).toBe(promise);
    });
});