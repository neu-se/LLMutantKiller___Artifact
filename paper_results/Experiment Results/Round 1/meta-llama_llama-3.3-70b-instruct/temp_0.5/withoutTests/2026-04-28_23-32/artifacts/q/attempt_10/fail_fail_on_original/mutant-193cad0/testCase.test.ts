import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.any", () => {
    it("should reject with an error when all promises are rejected", async () => {
        const promise1 = Q.reject("error1");
        const promise2 = Q.reject("error2");
        const promise3 = Q.reject("error3");

        await expect(Q.any([promise1, promise2, promise3])).rejects.toThrowError(
            expect.objectContaining({
                message: expect.stringContaining("Q can't get fulfillment value from any promise, all promises were rejected"),
            })
        );
    });
});