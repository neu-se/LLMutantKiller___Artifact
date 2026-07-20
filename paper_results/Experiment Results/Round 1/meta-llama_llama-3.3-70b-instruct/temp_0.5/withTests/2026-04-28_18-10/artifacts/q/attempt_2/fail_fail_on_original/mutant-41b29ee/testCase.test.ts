import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should resolve with an array of values when all promises are resolved", () => {
        const promise1 = q.Q(1);
        const promise2 = q.Q(2);
        const promise3 = q.Q(3);

        return q.Q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });

    it("should reject with the reason of the first rejected promise", () => {
        const promise1 = q.Q(1);
        const promise2 = q.Q.reject("Error");
        const promise3 = q.Q(3);

        return q.Q.all([promise1, promise2, promise3]).then(() => {
            expect(true).toBe(false);
        }, (reason: any) => {
            expect(reason).toBe("Error");
        });
    });
});