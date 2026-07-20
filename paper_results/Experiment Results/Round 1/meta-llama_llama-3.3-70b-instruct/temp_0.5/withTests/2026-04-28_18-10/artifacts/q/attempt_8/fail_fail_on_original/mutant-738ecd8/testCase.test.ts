import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise join functionality", () => {
    it("should join two promises and return a promise that is fulfilled with the same value if both promises are fulfilled with the same value", () => {
        const promise1 = Q(5);
        const promise2 = Q(5);
        return Q.join(promise1, promise2).then((value: any) => {
            expect(value).toBe(5);
        });
    });

    it("should throw an error when the promises are not fulfilled with the same value", () => {
        const promise1 = Q(5);
        const promise2 = Q(10);
        return Q.join(promise1, promise2).then(() => {
            throw new Error("Expected error not thrown");
        }, (error: any) => {
            expect(error).not.toBeNull();
        });
    });
});