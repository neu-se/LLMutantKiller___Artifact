import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected function", () => {
    it("should return true for a rejected promise", () => {
        const promise = Q.reject(new Error("Test error"));
        expect(Q.isRejected(promise)).toBe(true);
    });

    it("should return false for a fulfilled promise", () => {
        const promise = Q(10);
        expect(Q.isRejected(promise)).toBe(false);
    });

    it("should return false for a pending promise", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(Q.isRejected(promise)).toBe(false);
    });
});