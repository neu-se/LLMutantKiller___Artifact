import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isPending", () => {
    it("should return false for a pending promise that is not pending", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.resolve();
        expect(Q.isPending(promise)).toBe(false);
    });

    it("should return false for a fulfilled promise", () => {
        const promise = Q(10);
        expect(Q.isPending(promise)).toBe(false);
    });

    it("should return false for a rejected promise", () => {
        const promise = Q.reject(new Error("Test"));
        expect(Q.isPending(promise)).toBe(false);
    });
});