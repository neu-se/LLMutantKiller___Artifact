import { Q } from "../../../../../q.js";

describe("Q.all", () => {
    it("should fulfill when all promises are fulfilled and handle pending promises", () => {
        const promise1 = Q(1);
        const promise2 = Q.defer().promise;
        const promise3 = Q(3);

        promise2.resolve(2);

        return Q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });
});