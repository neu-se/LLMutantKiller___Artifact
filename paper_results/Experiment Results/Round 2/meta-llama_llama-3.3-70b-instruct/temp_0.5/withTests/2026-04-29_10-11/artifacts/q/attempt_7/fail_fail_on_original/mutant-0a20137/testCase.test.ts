import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should not throw an error when Q.join is called with two promises", () => {
        const promise1 = Q(1);
        const promise2 = Q(2);
        expect(() => Q.join(promise1, promise2)).not.toThrow();
    });
});