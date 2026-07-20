import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
    it("should resolve with the first fulfilled promise", () => {
        const promise1 = Q.resolve("Promise 1");
        const promise2 = Q.resolve("Promise 2");
        return Q.race([promise1, promise2]).then((value) => {
            expect(value).toBe("Promise 1");
        });
    });
});