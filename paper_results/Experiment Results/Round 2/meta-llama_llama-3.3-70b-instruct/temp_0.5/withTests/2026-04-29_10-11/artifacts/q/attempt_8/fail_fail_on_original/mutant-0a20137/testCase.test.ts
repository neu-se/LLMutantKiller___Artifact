import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should return a promise that resolves to the value of the first promise when two promises with the same value are joined", () => {
        const promise1 = Q(1);
        const promise2 = Q(1);
        const joinedPromise = Q.join(promise1, promise2);
        return joinedPromise.then((value) => {
            expect(value).toBe(1);
        });
    });
});