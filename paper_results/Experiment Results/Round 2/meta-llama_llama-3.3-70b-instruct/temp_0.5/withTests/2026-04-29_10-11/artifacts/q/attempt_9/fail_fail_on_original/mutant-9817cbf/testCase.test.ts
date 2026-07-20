import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should reject with a meaningful error message when all promises are rejected", () => {
        const promise1 = Q.reject("Error 1");
        const promise2 = Q.reject("Error 2");
        const promise3 = Q.reject("Error 3");

        return Q.any([promise1, promise2, promise3]).then((value: any) => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error).not.toBeNull();
            expect(error.message).not.toBeNull();
        });
    });
});