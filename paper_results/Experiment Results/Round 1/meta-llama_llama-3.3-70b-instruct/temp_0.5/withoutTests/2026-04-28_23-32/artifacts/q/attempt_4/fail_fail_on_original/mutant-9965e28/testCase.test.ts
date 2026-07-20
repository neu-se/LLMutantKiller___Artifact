import { Q } from "./q";

describe("Q", () => {
    it("should track unhandled rejections correctly", () => {
        const reason = new Error("Test error");
        reason.stack = undefined;
        const promise = Q.reject(reason);
        const unhandledReasons = Q.getUnhandledReasons();
        expect(unhandledReasons.length).toBe(1);
        expect(unhandledReasons[0]).toBe("(no stack) Error: Test error");
    });
});