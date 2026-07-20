import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should reject with a correct error message when all promises are rejected", () => {
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const promises = [deferred1.promise, deferred2.promise];

        const promise = Q.any(promises);

        deferred1.reject(new Error("Error 1"));
        deferred2.reject(new Error("Error 2"));

        return promise.then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error).not.toBeNull();
            expect(typeof error).toBe('object');
        });
    });
});