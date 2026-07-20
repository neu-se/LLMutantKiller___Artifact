import { Q } from "./q";

describe("Q", () => {
    it("should handle process object correctly", () => {
        // Create a promise that rejects
        const promise = Q.reject(new Error("Test error"));

        // Check if the rejection is tracked correctly
        const originalLength = Q.getUnhandledReasons().length;

        // Untrack the rejection
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.untrackRejection(promise);
        }

        // Check if the rejection was untracked correctly
        expect(Q.getUnhandledReasons().length).toBeLessThan(originalLength);
    });
});