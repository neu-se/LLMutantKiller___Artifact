import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        const promise = Q.reject(new Error("Test error"));
        expect(promise.isRejected()).toBe(true);
    });
});