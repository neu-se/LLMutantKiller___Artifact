import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should resolve with an array of values when all promises are resolved", async () => {
        const promise1 = Q(1);
        const promise2 = Q(2);
        const promise3 = Q(3);

        const result = await Q.all([promise1, promise2, promise3]);

        expect(result).toEqual([1, 2, 3]);
    });
});