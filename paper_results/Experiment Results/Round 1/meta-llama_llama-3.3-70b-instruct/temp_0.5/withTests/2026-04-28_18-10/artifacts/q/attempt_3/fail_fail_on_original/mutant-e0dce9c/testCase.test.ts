import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.valueOf", () => {
    it("should return the promise when the state is pending", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(promise.valueOf()).toBe(promise);
    });

    it("should return the value when the state is fulfilled and not rejected", () => {
        const promise = Q(10);
        expect(promise.valueOf()).toBe(10);
    });

    it("should return the promise when the state is rejected", () => {
        const promise = Q.reject(new Error("Test"));
        expect(promise.valueOf()).toBe(promise);
    });
});