import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race function", () => {
    it("should resolve with the first fulfilled promise", () => {
        const promise1 = Q.delay(100).then(() => 1);
        const promise2 = Q.delay(50).then(() => 2);
        return Q.race([promise1, promise2]).then((value) => {
            expect(value).toBe(2);
        });
    });

    it("should reject with the first rejected promise", () => {
        const promise1 = Q.delay(100).then(() => { throw new Error("Error 1"); });
        const promise2 = Q.delay(50).then(() => { throw new Error("Error 2"); });
        return Q.race([promise1, promise2]).then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe("Error 2");
        });
    });
});