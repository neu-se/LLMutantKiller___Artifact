import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of Q.any", () => {
        const promise1 = Q(1);
        const promise2 = Q(2);
        const promise3 = Q.reject(new Error("Test error"));

        return Q.any([promise1, promise2, promise3]).then((value) => {
            expect(value).toBe(1);
        });
    });
});