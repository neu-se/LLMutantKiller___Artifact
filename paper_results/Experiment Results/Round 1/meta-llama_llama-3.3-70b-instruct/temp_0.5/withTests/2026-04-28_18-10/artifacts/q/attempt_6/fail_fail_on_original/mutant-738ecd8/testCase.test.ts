import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise join functionality", () => {
    it("should throw an error when the promises are not fulfilled with the same value", () => {
        const promise1 = Q(5);
        const promise2 = Q(10);
        return Q.join(promise1, promise2).then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error.message).toBe("Q can't join: not the same: 5 10");
        });
    });
});