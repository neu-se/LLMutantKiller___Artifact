import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should resolve with an array of values when all promises are fulfilled", () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then((values) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });

    it("should reject with an error when one of the promises is rejected", () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.reject("Error");
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).catch((error) => {
            expect(error).toBe("Error");
        });
    });

    it("should not resolve with an array of values when one of the promises is pending", () => {
        const promise1 = Q.resolve(1);
        const promise2 = new Q((resolve, reject) => {
            setTimeout(() => {
                resolve(2);
            }, 1000);
        });
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then((values) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });
});