import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.any", () => {
    it("should reject with an error when all promises are rejected", async () => {
        const promise1 = Q.reject("error1");
        const promise2 = Q.reject("error2");
        const promise3 = Q.reject("error3");

        try {
            await Q.any([promise1, promise2, promise3]);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });
});