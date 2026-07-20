import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Promise.prototype.valueOf", () => {
    it("should return the promise itself if it is pending", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(promise.valueOf()).toBe(promise);
    });

    it("should return the fulfillment value if the promise is fulfilled", () => {
        const promise = Q(10);
        expect(promise.valueOf()).toBe(10);
    });

    it("should return the promise itself if it is rejected", () => {
        const promise = Q.reject(new Error("Test"));
        expect(promise.valueOf()).toBe(promise);
    });
});