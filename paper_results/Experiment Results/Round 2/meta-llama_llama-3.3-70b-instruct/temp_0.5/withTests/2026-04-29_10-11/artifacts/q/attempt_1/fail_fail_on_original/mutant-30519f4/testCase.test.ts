import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should fulfill when all promises are fulfilled", () => {
        const promise1 = Q(1);
        const promise2 = Q(2);
        const promise3 = Q(3);

        return Q.all([promise1, promise2, promise3]).then((values) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });

    it("should reject when any promise is rejected", () => {
        const promise1 = Q(1);
        const promise2 = Q.reject("Error");
        const promise3 = Q(3);

        return Q.all([promise1, promise2, promise3]).then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error).toBe("Error");
        });
    });

    it("should fulfill with an empty array when given an empty array", () => {
        return Q.all([]).then((values) => {
            expect(values).toEqual([]);
        });
    });
});