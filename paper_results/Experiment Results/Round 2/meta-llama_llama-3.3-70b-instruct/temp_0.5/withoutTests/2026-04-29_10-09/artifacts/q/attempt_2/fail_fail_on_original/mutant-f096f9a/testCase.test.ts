import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any function", () => {
    it("should reject with an error when all promises are rejected", () => {
        const promise1 = Q.reject("Error 1");
        const promise2 = Q.reject("Error 2");
        const promise3 = Q.reject("Error 3");

        return Q.any([promise1, promise2, promise3]).then((result) => {
            expect(true).toBe(false); // this should not be reached
        }).catch((error) => {
            expect(error.message).toContain("all promises were rejected");
        });
    });
});