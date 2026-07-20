import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should resolve with an array of values when all promises are resolved and pendingCount is updated", async () => {
        const promise1 = q(1);
        const promise2 = q(2);
        const promise3 = q(3);

        const promises = [promise1, promise2, promise3];
        const pendingCount = promises.length;
        let resolvedCount = 0;

        q.all(promises).then((values) => {
            resolvedCount = pendingCount;
            expect(resolvedCount).toBe(pendingCount);
        });
        await q.delay(10);
    });
});