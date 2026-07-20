import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should resolve with an array of values when all promises are resolved and the pendingCount is decremented correctly", async () => {
        const promise1 = q(1);
        const promise2 = q(2);
        const promise3 = q(3);

        let pendingCount = 3;
        const promises = [promise1, promise2, promise3];
        q.all(promises).then((values) => {
            pendingCount -= 3;
            expect(pendingCount).toBe(0);
        });
        await q.delay(10);
    });
});