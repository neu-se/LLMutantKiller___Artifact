import { Q } from "../../../q.js";

describe("Q.all", () => {
    it("should fulfill when all promises are fulfilled and handle pending promises", () => {
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const promise1 = deferred1.promise;
        const promise2 = deferred2.promise;

        Q.nextTick(() => {
            deferred1.resolve(1);
            deferred2.resolve(2);
        });

        return Q.all([promise1, promise2]).then((values: any[]) => {
            expect(values).toEqual([1, 2]);
        });
    });

    it("should reject when any promise is rejected and handle pending promises", () => {
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const promise1 = deferred1.promise;
        const promise2 = deferred2.promise;

        Q.nextTick(() => {
            deferred1.resolve(1);
            deferred2.reject("Error");
        });

        return Q.all([promise1, promise2]).then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error).toBe("Error");
        });
    });
});