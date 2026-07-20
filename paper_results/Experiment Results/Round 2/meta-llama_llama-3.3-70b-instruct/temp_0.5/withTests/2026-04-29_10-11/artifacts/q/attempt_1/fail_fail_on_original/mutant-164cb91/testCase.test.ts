import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        const promise = Q.reject(new Error("Test error"));
        const unhandledReasons = Q.getUnhandledReasons();
        expect(unhandledReasons.length).toBe(1);
        expect(unhandledReasons[0]).toBe("(no stack) Error: Test error");
    });
});