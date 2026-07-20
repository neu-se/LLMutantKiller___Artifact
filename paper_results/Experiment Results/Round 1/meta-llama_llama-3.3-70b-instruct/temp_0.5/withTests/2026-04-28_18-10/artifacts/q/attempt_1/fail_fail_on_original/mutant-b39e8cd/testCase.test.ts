import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should correctly identify a rejected promise", () => {
        const error = new Error("Test error");
        const rejectedPromise = Q.reject(error);
        expect(rejectedPromise.isRejected()).toBe(true);
    });
});