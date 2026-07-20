import { Q } from "./q.js";

describe("Q.all", () => {
    it("should handle fulfilled promises correctly", () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then((values) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });

    it("should not resolve with rejected promises", () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.reject(2);
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).catch((error) => {
            expect(error).toBe(2);
        });
    });

    it("should resolve with promises that are not fulfilled", () => {
        const promise1 = Q.defer().promise;
        const promise2 = Q.defer().promise;
        const promise3 = Q.defer().promise;

        promise1.resolve(1);
        promise2.resolve(2);
        promise3.resolve(3);

        return Q.all([promise1, promise2, promise3]).then((values) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });
});