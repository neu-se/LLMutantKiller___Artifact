import { Q } from "../q.js";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        Q.stopUnhandledRejectionTracking();
        const promise = Q.reject("Test rejection");
        const reasons = Q.getUnhandledReasons();
        expect(reasons.length).toBe(1);
        expect(reasons[0]).toContain("Test rejection");
        if (typeof process !== "undefined" && typeof process.emit === "function") {
            // In the mutated code, process.emit will not be called because of the condition change
            expect(process.emit).not.toHaveBeenCalled();
        }
    });
});