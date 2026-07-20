import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Promise.prototype.valueOf", () => {
    it("should return the promise itself when the promise is pending", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(promise.valueOf()).toBe(promise);
    });

    it("should return the value of the promise when it is fulfilled", () => {
        const promise = Q(10);
        expect(promise.valueOf()).toBe(10);
    });

    it("should return the promise itself when the promise is rejected", () => {
        const promise = Q.reject(new Error("Test"));
        expect(promise.valueOf()).toBe(promise);
    });

    it("should return the value of the promise when it is fulfilled to a promise", () => {
        const innerPromise = Q(10);
        const promise = Q(innerPromise);
        expect(promise.valueOf()).toBe(innerPromise);
    });
});