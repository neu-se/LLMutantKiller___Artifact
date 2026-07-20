import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q.isPending", () => {
    it("should return true for a pending promise", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(Q.isPending(promise)).toBe(true);
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