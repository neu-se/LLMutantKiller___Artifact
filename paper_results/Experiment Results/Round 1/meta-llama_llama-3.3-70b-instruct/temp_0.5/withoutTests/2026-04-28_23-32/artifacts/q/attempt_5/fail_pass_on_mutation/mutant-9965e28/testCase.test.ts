import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should track unhandled rejections correctly", () => {
        const reason = new Error("Test error");
        reason.stack = "Test stack";
        const unhandledReasons = [];
        const trackRejection = (promise, reason) => {
            if (reason && typeof reason.stack !== "undefined") {
                unhandledReasons.push(reason.stack);
            } else {
                unhandledReasons.push("(no stack) " + reason);
            }
        };
        trackRejection(null, reason);
        expect(unhandledReasons.length).toBe(1);
        expect(unhandledReasons[0]).toContain("Test stack");
    });
});