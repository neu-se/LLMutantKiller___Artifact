import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should result in a rejected promise when given a rejected promise", () => {
        const rejectedPromise = Q.reject(new Error("Test error"));
        const result = Q(rejectedPromise);
        expect(result.isRejected()).toBe(true);
    });
});