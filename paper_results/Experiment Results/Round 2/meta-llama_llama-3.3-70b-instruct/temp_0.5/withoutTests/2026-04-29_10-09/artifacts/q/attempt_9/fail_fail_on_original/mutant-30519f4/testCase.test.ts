import { Q } from "./q.js";

describe("Q.all", () => {
    it("should reject with an error when one of the promises is rejected", () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.reject("Error");
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).catch((error) => {
            expect(error).toBe("Error");
        });
    });

    it("should resolve with an array of values when all promises are fulfilled", () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then((values) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });

    it("should resolve with an array of values when one of the promises is pending and then resolved", () => {
        const promise1 = Q.resolve(1);
        const promise2 = new Q((resolve) => {
            resolve(2);
        });
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then((values) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });
});