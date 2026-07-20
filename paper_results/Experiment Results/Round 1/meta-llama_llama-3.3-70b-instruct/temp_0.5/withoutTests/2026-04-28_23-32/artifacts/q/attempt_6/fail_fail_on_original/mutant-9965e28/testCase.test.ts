import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should track unhandled rejections correctly", () => {
        const reason = new Error("Test error");
        reason.stack = "Test stack";
        const promise = Q.reject(reason);
        const unhandledReasons = Q.getUnhandledReasons();
        expect(unhandledReasons.length).toBe(1);
        expect(unhandledReasons[0]).not.toBe("(no stack) Error: Test error");
    });
});