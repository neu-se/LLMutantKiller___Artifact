import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q function", () => {
    it("should result in a rejected promise when given a rejected promise", () => {
        const error = new Error("Test error");
        const rejectedPromise = Q.reject(error);
        const promise = Q(rejectedPromise);
        expect(promise.isRejected()).toBe(true);
        expect(promise.inspect().reason).toBe(error);
    });
});