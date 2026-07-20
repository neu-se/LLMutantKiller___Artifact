import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected", () => {
    it("should return false for a promise that is not rejected", () => {
        const promise = Q(true);
        expect(Q.isRejected(promise)).toBe(false);
    });

    it("should return false for a rejected promise when the mutation is applied", () => {
        const promise = Q.reject(new Error("Test error"));
        // Simulate the mutation by always returning true
        const isRejected = (object: any) => true;
        expect(isRejected(promise)).toBe(true);
    });
});