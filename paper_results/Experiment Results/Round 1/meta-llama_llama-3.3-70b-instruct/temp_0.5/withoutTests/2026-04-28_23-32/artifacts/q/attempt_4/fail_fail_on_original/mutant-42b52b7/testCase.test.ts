import { Q } from "./q";

describe("Q", () => {
    it("should handle unhandled rejections correctly", (done) => {
        Q.stopUnhandledRejectionTracking();
        const promise = Q.reject("Test rejection");
        Q.nextTick.runAfter(() => {
            const reasons = Q.getUnhandledReasons();
            expect(reasons.length).toBe(1);
            expect(reasons[0]).toContain("Test rejection");
            done();
        });
        Q.nextTick.runAfter(() => {
            if (typeof process !== "undefined" && typeof process.emit === "function") {
                expect(process.emit).toHaveBeenCalledTimes(1);
            }
            done();
        });
    });
});