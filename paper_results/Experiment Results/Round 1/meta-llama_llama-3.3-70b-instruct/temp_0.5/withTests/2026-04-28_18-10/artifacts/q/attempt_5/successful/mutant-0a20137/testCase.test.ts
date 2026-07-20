import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should return a value when two promises are joined", () => {
        const promise1 = q(1);
        const promise2 = q(1);
        return q.join(promise1, promise2).then((value) => {
            expect(value).toBe(1);
        });
    });
});