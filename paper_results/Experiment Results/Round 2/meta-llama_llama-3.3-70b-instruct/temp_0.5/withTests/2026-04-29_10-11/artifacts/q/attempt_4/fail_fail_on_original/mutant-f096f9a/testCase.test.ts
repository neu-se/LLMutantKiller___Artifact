import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should fulfill with the first resolved promise", () => {
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();

        const promise = Q.any([deferred1.promise, deferred2.promise]);

        Q.delay(10).then(() => {
            deferred1.resolve("Fulfilled 1");
        });
        Q.delay(20).then(() => {
            deferred2.resolve("Fulfilled 2");
        });

        return promise.then((value: any) => {
            expect(value).toBe("Fulfilled 1");
        });
    });

    it("should reject with an error if all promises are rejected", () => {
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();

        const promise = Q.any([deferred1.promise, deferred2.promise]);

        Q.delay(10).then(() => {
            deferred1.reject(new Error("Rejected 1"));
        });
        Q.delay(20).then(() => {
            deferred2.reject(new Error("Rejected 2"));
        });

        return promise.then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error.message).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: Rejected 2");
        });
    });

    it("should not fulfill if Q.any is empty", () => {
        const promise = Q.any([]);

        return promise.then((value: any) => {
            expect(value).toBeUndefined();
        });
    });

    it("should throw an error if Q.any is called with no arguments", () => {
        expect(() => Q.any()).toThrowError();
    });
});