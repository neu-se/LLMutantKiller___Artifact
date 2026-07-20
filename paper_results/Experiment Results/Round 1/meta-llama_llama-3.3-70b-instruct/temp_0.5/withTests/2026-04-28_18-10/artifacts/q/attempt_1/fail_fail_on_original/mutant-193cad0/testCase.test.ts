import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should reject with a meaningful error when all promises are rejected", () => {
        const promise1 = Q.defer().promise;
        const promise2 = Q.defer().promise;
        const promise3 = Q.defer().promise;

        Q.any([promise1, promise2, promise3]).then(
            () => {
                expect(true).toBe(false);
            },
            (error) => {
                expect(error.message).toMatch("Q can't get fulfillment value from any promise, all promises were rejected");
            }
        );

        promise1.reject(new Error("Error 1"));
        promise2.reject(new Error("Error 2"));
        promise3.reject(new Error("Error 3"));
    });
});