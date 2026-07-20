import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
    it("should resolve with the first fulfilled promise", () => {
        const promise1 = Q.delay(100).then(() => "Promise 1");
        const promise2 = Q.delay(50).then(() => "Promise 2");
        return Q.race([promise1, promise2]).then((value: any) => {
            expect(value).toBe("Promise 2");
        });
    });

    it("should reject with the first rejected promise", () => {
        const promise1 = Q.delay(100).then(() => { throw new Error("Promise 1"); });
        const promise2 = Q.delay(50).then(() => { throw new Error("Promise 2"); });
        return Q.race([promise1, promise2]).then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error.message).toBe("Promise 2");
        });
    });

    it("should fail when no promises are provided", () => {
        return Q.race([]).then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});