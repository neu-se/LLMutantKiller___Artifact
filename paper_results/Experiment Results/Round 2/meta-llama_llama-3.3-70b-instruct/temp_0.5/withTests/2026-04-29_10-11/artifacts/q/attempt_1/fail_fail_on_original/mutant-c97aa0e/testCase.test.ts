import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should return a promise that is fulfilled with the first fulfilled promise", () => {
        const promise1 = Q.delay(100).then(() => "Promise 1");
        const promise2 = Q.delay(50).then(() => "Promise 2");
        const promise3 = Q.delay(200).then(() => "Promise 3");

        return Q.any([promise1, promise2, promise3]).then((value) => {
            expect(value).toBe("Promise 2");
        });
    });

    it("should return a promise that is rejected if all promises are rejected", () => {
        const promise1 = Q.delay(100).then(() => { throw new Error("Promise 1"); });
        const promise2 = Q.delay(50).then(() => { throw new Error("Promise 2"); });
        const promise3 = Q.delay(200).then(() => { throw new Error("Promise 3"); });

        return Q.any([promise1, promise2, promise3]).then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: Promise 3");
        });
    });
});