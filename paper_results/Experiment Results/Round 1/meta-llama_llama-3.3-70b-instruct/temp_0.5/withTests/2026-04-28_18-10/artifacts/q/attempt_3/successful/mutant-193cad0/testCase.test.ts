import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should reject with a meaningful error when all promises are rejected", (done) => {
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const promise1 = deferred1.promise;
        const promise2 = deferred2.promise;

        Q.any([promise1, promise2]).then(
            () => {
                expect(true).toBe(false);
            },
            (error: any) => {
                expect(typeof error).toBe('object');
                expect(error.message).toMatch("Q can't get fulfillment value from any promise, all promises were rejected");
                done();
            }
        );

        deferred1.reject(new Error("Error 1"));
        deferred2.reject(new Error("Error 2"));
    });
});