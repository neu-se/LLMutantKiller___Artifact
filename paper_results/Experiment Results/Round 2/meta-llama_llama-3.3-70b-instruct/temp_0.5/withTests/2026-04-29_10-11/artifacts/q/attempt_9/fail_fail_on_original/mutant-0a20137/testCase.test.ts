import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should return a promise when two promises are joined", () => {
        const promise1 = Q(1);
        const promise2 = Q(2);
        const joinedPromise = Q(promise1).join(promise2);
        expect(joinedPromise.then).toBeInstanceOf(Function);
    });
});