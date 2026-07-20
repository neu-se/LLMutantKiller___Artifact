import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q.isRejected function", () => {
    it("should return true for a rejected promise and false for a non-rejected promise", () => {
        const rejectedPromise = Q.reject(new Error("Test error"));
        const fulfilledPromise = Q.resolve("Test value");

        expect(Q.isRejected(rejectedPromise)).toBe(true);
        expect(Q.isRejected(fulfilledPromise)).toBe(false);
    });
});