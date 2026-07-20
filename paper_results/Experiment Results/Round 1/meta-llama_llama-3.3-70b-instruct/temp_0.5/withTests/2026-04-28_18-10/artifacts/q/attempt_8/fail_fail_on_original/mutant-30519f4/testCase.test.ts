import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should fulfill when all promises are fulfilled", () => {
        const promise1 = Q(1);
        const promise2 = Q(2);
        const promise3 = Q(3);

        return Q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });

    it("should reject when any promise is rejected", () => {
        const promise1 = Q(1);
        const promise2 = Q.reject("error");
        const promise3 = Q(3);

        return Q.all([promise1, promise2, promise3]).then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error).toBe("error");
        });
    });

    it("should fulfill when all promises are fulfilled, even if some are already resolved", () => {
        const promise1 = Q(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q(3);

        return Q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });

    it("should reject when any promise is rejected, even if some are already resolved", () => {
        const promise1 = Q(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q.reject("error");

        return Q.all([promise1, promise2, promise3]).then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error).toBe("error");
        });
    });

    it("should reject when a promise is rejected and another is pending", () => {
        const promise1 = Q.reject("error");
        const promise2 = Q.defer().promise;

        return Q.all([promise1, promise2]).then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error).toBe("error");
        });
    });

    it("should not fulfill when a promise is pending", () => {
        const promise1 = Q.defer().promise;
        const promise2 = Q(2);
        const promise3 = Q(3);

        return Q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(true).toBe(false);
        });
    });

    it("should fulfill with the correct value when all promises are fulfilled and one of them is a promise that is already resolved", () => {
        const promise1 = Q(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q(3);

        const snapshot = promise2.inspect();
        let newPromise3 = promise3;
        if ((snapshot as any).state === "fulfilled") {
            newPromise3 = promise2;
        }

        return Q.all([promise1, promise2, newPromise3]).then((values: any[]) => {
            expect(values).toEqual([1, 2, 2]);
        });
    });
});