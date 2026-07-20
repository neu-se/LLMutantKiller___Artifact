import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.isPending", () => {
    it("should return true for a pending promise", () => {
        const deferred = Q.defer();
        expect(Q.isPending(deferred.promise)).toBe(true);
    });

    it("should return false for a fulfilled promise", () => {
        const promise = Q.resolve(1);
        expect(Q.isPending(promise)).toBe(false);
    });

    it("should return false for a rejected promise", () => {
        const promise = Q.reject(new Error());
        expect(Q.isPending(promise)).toBe(false);
    });

    it("should return false for a non-promise value", () => {
        expect(Q.isPending(1)).toBe(false);
    });
});