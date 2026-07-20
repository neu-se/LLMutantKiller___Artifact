import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race function", () => {
    it("should resolve with the first fulfilled promise", () => {
        const promise1 = new Q((resolve) => {
            setTimeout(() => {
                resolve(1);
            }, 100);
        });
        const promise2 = new Q((resolve) => {
            setTimeout(() => {
                resolve(2);
            }, 50);
        });
        return Q.race([promise1, promise2]).then((value) => {
            expect(value).toBe(2);
        });
    });

    it("should reject with the first rejected promise", () => {
        const promise1 = new Q((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("Error 1"));
            }, 100);
        });
        const promise2 = new Q((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("Error 2"));
            }, 50);
        });
        return Q.race([promise1, promise2]).then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe("Error 2");
        });
    });
});