import { Q } from "./q.js";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        Q.stopUnhandledRejectionTracking();
        const promise = Q.reject("Test rejection");
        const reasons = Q.getUnhandledReasons();
        expect(reasons.length).toBe(1);
        expect(reasons[0]).toContain("Test rejection");
        if (typeof process !== "undefined" && typeof process.emit === "function") {
            expect(process.emit).toHaveBeenCalledTimes(1);
        }
    });
});