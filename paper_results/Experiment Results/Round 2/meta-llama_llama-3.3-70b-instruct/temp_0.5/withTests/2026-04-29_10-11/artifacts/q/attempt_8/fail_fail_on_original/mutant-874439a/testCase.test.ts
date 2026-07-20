import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected", () => {
    it("should return false for a fulfilled promise and true for a rejected promise, but the mutation should make it return true for a fulfilled promise", () => {
        expect(Q.isRejected(Q(10))).toBe(false);
        expect(Q.isRejected(Q.reject(new Error()))).toBe(true);
        // If the mutation is applied, this test will fail
        expect(Q.isRejected(Q(10))).not.toBe(true);
    });
});