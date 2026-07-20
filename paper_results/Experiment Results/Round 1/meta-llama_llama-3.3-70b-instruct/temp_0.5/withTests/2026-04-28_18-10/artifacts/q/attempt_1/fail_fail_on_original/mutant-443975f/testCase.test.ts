import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should resolve a promise with a timeout", async () => {
        const promise = Q.delay(10).then(() => 10);
        await expect(promise).resolves.toBe(10);
    });

    it("should reject a promise with a timeout", async () => {
        const promise = Q.delay(10).then(() => { throw new Error("Test error"); });
        await expect(promise).rejects.toThrow("Test error");
    });
});