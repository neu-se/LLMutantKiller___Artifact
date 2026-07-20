import { Q } from "./q";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        const promise = Q.reject(new Error("Test error"));
        const originalLength = Q.getUnhandledReasons().length;
        Q.untrackRejection(promise);
        if (typeof process === "object" && typeof process.emit === "function") {
            expect(Q.getUnhandledReasons().length).toBeLessThan(originalLength);
        } else {
            expect(Q.getUnhandledReasons().length).toBe(originalLength);
        }
    });
});