import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should reject with a meaningful error message when all promises are rejected", async () => {
        const promise1 = Q.reject(new Error("Error 1"));
        const promise2 = Q.reject(new Error("Error 2"));
        const promise3 = Q.reject(new Error("Error 3"));

        await expect(Q.any([promise1, promise2, promise3])).rejects.toThrowError(
            expect.objectContaining({ message: expect.stringContaining("Q can't get fulfillment value from any promise, all promises were rejected") })
        );
    });
});