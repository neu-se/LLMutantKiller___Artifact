import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should resolve with an array of values when all promises are resolved and all promises are processed", async () => {
        const promise1 = q(1);
        const promise2 = q(2);
        const promise3 = q(3);

        const promises = [promise1, promise2, promise3];
        const results = await q.all(promises);

        expect(results).toEqual([1, 2, 3]);

        // Check if all promises are processed
        for (let i = 0; i < promises.length; i++) {
            expect(promises[i].inspect().state).toBe("fulfilled");
        }
    });
});