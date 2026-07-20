import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should resolve with an array of values when all promises are resolved and all promises are properly handled", async () => {
        const promise1 = q(1);
        const promise2 = q(2);
        const promise3 = q(3);

        const result = await q.all([promise1, promise2, promise3]);

        expect(result).toEqual([1, 2, 3]);

        // Check if all promises are properly handled
        const promises = [q(1), q(2), q(3)];
        const handledPromises = [];
        q.all(promises).then((values) => {
            handledPromises.push(...values);
        });
        await q.delay(10);
        expect(handledPromises).toEqual([1, 2, 3]);
    });
});