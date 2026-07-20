import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.valueOf", () => {
    it("should return the promise itself when the promise is pending", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(promise.valueOf()).toBe(promise);
    });

    it("should return the value when the promise is fulfilled", () => {
        const promise = Q(10);
        expect(promise.valueOf()).toBe(10);
    });

    it("should return the promise itself when the promise is rejected", () => {
        const promise = Q.reject(new Error("Test"));
        expect(promise.valueOf()).toBe(promise);
    });
});