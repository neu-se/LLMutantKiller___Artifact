import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.allSettled", () => {
    it("should resolve with an array of snapshots when all promises are settled", async () => {
        const promise1 = q(10);
        const promise2 = q.reject(new Error("Error"));
        const promise3 = q(20);

        const result = await q.allSettled([promise1, promise2, promise3]);
        expect(result).toEqual([
            { state: "fulfilled", value: 10 },
            { state: "rejected", reason: new Error("Error") },
            { state: "fulfilled", value: 20 },
        ]);
    });
});