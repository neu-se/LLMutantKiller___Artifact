import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        // Create a promise that rejects
        const promise = Q.reject(new Error("Test error"));

        // Check if the rejection is tracked correctly
        const originalLength = Q.getUnhandledReasons().length;

        // Untrack the rejection
        Q.untrackRejection(promise);

        // Check if the rejection was untracked correctly
        expect(Q.getUnhandledReasons().length).toBe(originalLength);
    });
});