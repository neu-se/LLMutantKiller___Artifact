import { Promise } from "../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should test the behavior of Promise.any", () => {
        const promise1 = Promise.resolve(1);
        const promise2 = Promise.resolve(2);
        const promise3 = Promise.reject(new Error("Test error"));

        return Promise.any([promise1, promise2, promise3]).then((value) => {
            expect(value).toBe(1);
        });
    });
});