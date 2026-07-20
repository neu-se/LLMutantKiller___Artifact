import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race function", () => {
    it("should resolve with the first fulfilled promise", () => {
        const promise1 = q.Promise((resolve) => {
            setTimeout(() => {
                resolve(1);
            }, 100);
        });
        const promise2 = q.Promise((resolve) => {
            setTimeout(() => {
                resolve(2);
            }, 50);
        });
        return q.race([promise1, promise2]).then((value: number) => {
            expect(value).toBe(2);
        });
    });

    it("should reject with the first rejected promise", () => {
        const promise1 = q.Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("Error 1"));
            }, 100);
        });
        const promise2 = q.Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("Error 2"));
            }, 50);
        });
        return q.race([promise1, promise2]).then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error.message).toBe("Error 2");
        });
    });
});