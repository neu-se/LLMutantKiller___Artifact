import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should resolve with an array of values when all promises are resolved", async () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q.resolve(3);

        const result = await Q.all([promise1, promise2, promise3]);

        expect(result).toEqual([1, 2, 3]);
    });

    it("should reject with the reason of the first rejected promise", async () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.reject(new Error("Error"));
        const promise3 = Q.resolve(3);

        try {
            await Q.all([promise1, promise2, promise3]);
        } catch (error) {
            expect(error.message).toBe("Error");
        }
    });
});