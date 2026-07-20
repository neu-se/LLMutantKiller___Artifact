import { Q } from "../../../q.js";

describe("Q.all", () => {
    it("should resolve with an array of values when all promises are fulfilled", () => {
        const promise1 = Q(1);
        const promise2 = Q(2);
        const promise3 = Q(3);

        return Q.all([promise1, promise2, promise3]).then((values) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });
});