import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should resolve with an array of values when all promises are resolved", () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then((values) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });

    it("should reject with the first error when any promise is rejected", () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.reject(new Error("Error"));
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe("Error");
        });
    });

    it("should resolve with an array of values when promises are resolved in any order", () => {
        const promise1 = Q.delay(50).then(() => 1);
        const promise2 = Q.delay(20).then(() => 2);
        const promise3 = Q.delay(100).then(() => 3);

        return Q.all([promise1, promise2, promise3]).then((values) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });
});