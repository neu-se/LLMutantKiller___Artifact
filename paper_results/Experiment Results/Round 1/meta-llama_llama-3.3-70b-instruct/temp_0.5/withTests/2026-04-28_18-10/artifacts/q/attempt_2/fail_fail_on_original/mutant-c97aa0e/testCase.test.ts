import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should test the behavior of Q.any", () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q.reject(new Error("Test error"));

        return Q.any([promise1, promise2, promise3]).then((value) => {
            expect(value).toBe(1);
        });
    });
});