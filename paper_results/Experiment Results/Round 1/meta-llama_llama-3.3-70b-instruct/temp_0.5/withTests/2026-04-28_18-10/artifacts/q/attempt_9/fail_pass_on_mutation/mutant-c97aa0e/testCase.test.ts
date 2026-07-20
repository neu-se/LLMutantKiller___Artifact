import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of q.any", () => {
        const promise1 = q(1);
        const promise2 = q(2);
        const promise3 = q.reject(new Error("Test error"));

        return q.any([promise1, promise2, promise3]).then((value) => {
            expect(value).toBe(1);
        });
    });
});